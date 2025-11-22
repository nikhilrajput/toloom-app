const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001'
  : '';

export interface SavedDesign {
  id: string;
  imageData: string;
  warpRows: any[];
  warpColor: string;
  weftColor: string;
  pattern: string;
  gridSize: number;
  timestamp: number;
}

export async function getDesigns(): Promise<SavedDesign[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/designs`);
    if (!response.ok) {
      throw new Error('Failed to fetch designs');
    }
    const designs = await response.json();
    return designs.map((d: any) => ({
      id: d.id.toString(),
      imageData: d.imageData || d.image_data,
      warpRows: typeof d.warpRows === 'string' ? JSON.parse(d.warpRows) : d.warpRows,
      warpColor: d.warpColor || d.warp_color,
      weftColor: d.weftColor || d.weft_color,
      pattern: d.pattern,
      gridSize: d.gridSize || d.grid_size,
      timestamp: d.timestamp
    }));
  } catch (error) {
    console.error('Error fetching designs:', error);
    throw error;
  }
}

export async function saveDesign(design: Omit<SavedDesign, 'id'>): Promise<SavedDesign> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/designs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(design),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save design');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving design:', error);
    throw error;
  }
}
