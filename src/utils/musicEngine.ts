// Musical Weaving Engine - Continuous Ambient Soundscape
// Creates smooth, evolving tones that blend together

class MusicEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  
  // Continuous oscillators for each heddle (always playing, volume controlled)
  private heddleOscillators: Map<number, {
    oscillators: OscillatorNode[],
    gainNode: GainNode,
    filter: BiquadFilterNode,
    targetVolume: number // Track what volume this should be at
  }> = new Map();
  
  // Base frequencies for pentatonic scale (extended to 6 notes)
  private readonly heddleNotes: { [key: number]: number } = {
    1: 261.63, // C4
    2: 293.66, // D4
    3: 329.63, // E4
    4: 392.00, // G4
    5: 440.00, // A4
    6: 523.25, // C5
  };

  private currentRowDepth: number = 0;
  private totalRows: number = 0;
  private idleTimer: number | null = null;
  private readonly IDLE_TIMEOUT = 3000; // Fade out after 3 seconds of no interaction
  private enabled: boolean = false; // DISABLED FOR NOW

  constructor() {
    // Sound feature disabled - don't initialize
    // this.initAudio();
  }

  private initAudio() {
    if (!this.enabled) return; // Don't initialize if disabled
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.2; // Master volume
      
      // Initialize continuous oscillators for each heddle
      [1, 2, 3, 4, 5, 6].forEach(heddleNumber => {
        this.initializeHeddleOscillator(heddleNumber);
      });
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  // Create continuous oscillators for a heddle
  private initializeHeddleOscillator(heddleNumber: number) {
    if (!this.audioContext || !this.masterGain) return;

    const frequency = this.heddleNotes[heddleNumber];
    if (!frequency) return;

    // Create multiple oscillators for richness (fundamental + harmonics)
    const fundamental = this.audioContext.createOscillator();
    const harmonic2 = this.audioContext.createOscillator();
    const harmonic3 = this.audioContext.createOscillator();
    
    fundamental.type = 'sine';
    harmonic2.type = 'sine';
    harmonic3.type = 'sine';
    
    fundamental.frequency.value = frequency;
    harmonic2.frequency.value = frequency * 2;
    harmonic3.frequency.value = frequency * 3;
    
    // Mix harmonics
    const fundamentalGain = this.audioContext.createGain();
    const harmonic2Gain = this.audioContext.createGain();
    const harmonic3Gain = this.audioContext.createGain();
    
    fundamentalGain.gain.value = 1.0;
    harmonic2Gain.gain.value = 0.3;
    harmonic3Gain.gain.value = 0.15;
    
    fundamental.connect(fundamentalGain);
    harmonic2.connect(harmonic2Gain);
    harmonic3.connect(harmonic3Gain);
    
    // Create gain node for this heddle (starts at 0)
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0;
    
    fundamentalGain.connect(gainNode);
    harmonic2Gain.connect(gainNode);
    harmonic3Gain.connect(gainNode);
    
    // Add filter for warmth
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 5000;
    filter.Q.value = 0.5;
    
    gainNode.connect(filter);
    filter.connect(this.masterGain);
    
    // Start oscillators (they play continuously at zero volume)
    const now = this.audioContext.currentTime;
    fundamental.start(now);
    harmonic2.start(now);
    harmonic3.start(now);
    
    // Store references
    this.heddleOscillators.set(heddleNumber, {
      oscillators: [fundamental, harmonic2, harmonic3],
      gainNode,
      filter,
      targetVolume: 0
    });
  }

  // Reset idle timer - call this on any interaction
  private resetIdleTimer() {
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
    }
    
    this.idleTimer = window.setTimeout(() => {
      this.fadeAllToSilence();
    }, this.IDLE_TIMEOUT);
  }

  // Fade all playing sounds to silence
  private fadeAllToSilence() {
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    
    this.heddleOscillators.forEach(heddle => {
      heddle.gainNode.gain.cancelScheduledValues(now);
      heddle.gainNode.gain.setValueAtTime(heddle.gainNode.gain.value, now);
      heddle.gainNode.gain.linearRampToValueAtTime(0, now + 1.5); // Smooth 1.5s fade to silence
      heddle.targetVolume = 0;
    });
  }

  // Update pitch based on row depth
  updateDepth(rowIndex: number, totalRows: number) {
    this.currentRowDepth = rowIndex;
    this.totalRows = totalRows;
    
    // Update pitch and filter for all oscillators
    const depth = totalRows > 0 ? Math.min(rowIndex / totalRows, 1) : 0;
    const pitchMultiplier = 1 - (depth * 0.5); // Down to one octave lower
    const brightnessMultiplier = 1 - (depth * 0.4);
    
    this.heddleOscillators.forEach((heddle, heddleNumber) => {
      const baseFreq = this.heddleNotes[heddleNumber];
      if (!baseFreq) return;
      
      // Update frequencies
      heddle.oscillators[0].frequency.value = baseFreq * pitchMultiplier;
      heddle.oscillators[1].frequency.value = baseFreq * 2 * pitchMultiplier;
      heddle.oscillators[2].frequency.value = baseFreq * 3 * pitchMultiplier;
      
      // Update filter
      heddle.filter.frequency.value = 2000 + (brightnessMultiplier * 3000);
    });
  }

  // Smoothly fade in a heddle's sound (stays on continuously)
  fadeInHeddle(heddleNumber: number) {
    return; // DISABLED
    if (!this.audioContext) return;
    
    const heddle = this.heddleOscillators.get(heddleNumber);
    if (!heddle) return;
    
    const now = this.audioContext.currentTime;
    heddle.gainNode.gain.cancelScheduledValues(now);
    heddle.gainNode.gain.setValueAtTime(heddle.gainNode.gain.value, now);
    heddle.gainNode.gain.linearRampToValueAtTime(0.15, now + 0.3); // Smooth 300ms fade in
    heddle.targetVolume = 0.15;
    
    // Reset idle timer - will fade out after 3s of no interaction
    this.resetIdleTimer();
  }

  // Smoothly fade out a heddle's sound
  fadeOutHeddle(heddleNumber: number) {
    return; // DISABLED
    if (!this.audioContext) return;
    
    const heddle = this.heddleOscillators.get(heddleNumber);
    if (!heddle) return;
    
    const now = this.audioContext.currentTime;
    heddle.gainNode.gain.cancelScheduledValues(now);
    heddle.gainNode.gain.setValueAtTime(heddle.gainNode.gain.value, now);
    heddle.gainNode.gain.linearRampToValueAtTime(0, now + 0.6); // Smooth 600ms fade out
    heddle.targetVolume = 0;
    
    // Reset idle timer
    this.resetIdleTimer();
  }

  // Play a gentle swell when a row is woven (then fade out)
  playChord(selectedHeddles: number[], duration: number = 1.2, rowIndex?: number, totalRows?: number) {
    return; // DISABLED
    if (!this.audioContext) return;
    if (selectedHeddles.length === 0) return;

    // Update depth if provided
    if (rowIndex !== undefined && totalRows !== undefined) {
      this.updateDepth(rowIndex, totalRows);
    }

    const now = this.audioContext.currentTime;
    
    // Create a gentle swell for the selected heddles, then fade to silence
    selectedHeddles.forEach(heddleNumber => {
      const heddle = this.heddleOscillators.get(heddleNumber);
      if (!heddle) return;
      
      // Swell up, sustain briefly, then fade to silence
      heddle.gainNode.gain.cancelScheduledValues(now);
      heddle.gainNode.gain.setValueAtTime(0, now);
      heddle.gainNode.gain.linearRampToValueAtTime(0.22, now + 0.15); // Swell up
      heddle.gainNode.gain.setValueAtTime(0.22, now + 0.4); // Hold briefly
      heddle.gainNode.gain.linearRampToValueAtTime(0, now + duration + 0.8); // Fade to silence
      heddle.targetVolume = 0.22;
    });
    
    // Reset idle timer
    this.resetIdleTimer();
  }

  // Legacy method for single note (creates a brief swell)
  playNote(heddleNumber: number, duration: number = 0.2, rowIndex?: number, totalRows?: number) {
    return; // DISABLED
    if (!this.audioContext) return;
    
    const heddle = this.heddleOscillators.get(heddleNumber);
    if (!heddle) return;
    
    const now = this.audioContext.currentTime;
    const currentGain = heddle.gainNode.gain.value;
    
    // Brief swell
    heddle.gainNode.gain.cancelScheduledValues(now);
    heddle.gainNode.gain.setValueAtTime(currentGain, now);
    heddle.gainNode.gain.linearRampToValueAtTime(Math.max(currentGain, 0.12), now + 0.05);
    heddle.gainNode.gain.linearRampToValueAtTime(currentGain, now + duration);
    heddle.targetVolume = Math.max(currentGain, 0.12);
    
    // Reset idle timer
    this.resetIdleTimer();
  }

  // Play undo sound (fade all heddles briefly)
  playUndo() {
    return; // DISABLED
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    
    // Create descending swell through all heddles
    [6, 5, 4, 3, 2, 1].forEach((heddleNumber, index) => {
      const heddle = this.heddleOscillators.get(heddleNumber);
      if (!heddle) return;
      
      const startTime = now + index * 0.08;
      const currentGain = heddle.gainNode.gain.value;
      
      heddle.gainNode.gain.setValueAtTime(currentGain, startTime);
      heddle.gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      heddle.gainNode.gain.linearRampToValueAtTime(currentGain, startTime + 0.2);
      heddle.targetVolume = 0.15;
    });
    
    // Reset idle timer
    this.resetIdleTimer();
  }

  // Resume audio context
  resume() {
    return; // DISABLED
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Singleton instance
export const musicEngine = new MusicEngine();