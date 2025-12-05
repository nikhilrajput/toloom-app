import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 5000 : 3001);

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.get('/api/designs', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM designs ORDER BY timestamp DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching designs:', error);
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
});

app.post('/api/designs', async (req, res) => {
  try {
    const { imageData, warpRows, warpColor, weftColor, pattern, gridSize } = req.body;
    
    if (!imageData || !warpRows) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (imageData.length > 5000000) {
      return res.status(400).json({ error: 'Image data too large' });
    }

    const result = await pool.query(
      `INSERT INTO designs (image_data, warp_rows, warp_color, weft_color, pattern, grid_size, timestamp)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [imageData, JSON.stringify(warpRows), warpColor, weftColor, pattern, gridSize, Date.now()]
    );

    const design = result.rows[0];
    res.status(201).json({
      id: design.id.toString(),
      imageData: design.image_data,
      warpRows: JSON.parse(design.warp_rows),
      warpColor: design.warp_color,
      weftColor: design.weft_color,
      pattern: design.pattern,
      gridSize: design.grid_size,
      timestamp: design.timestamp
    });
  } catch (error) {
    console.error('Error saving design:', error);
    res.status(500).json({ error: 'Failed to save design' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from the build directory
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// SPA fallback - serve index.html for all remaining routes
app.use((req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${buildPath}`);
});
