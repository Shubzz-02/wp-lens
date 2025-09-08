const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.static('public'))

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/json') {
      cb(null, true)
    } else {
      cb(new Error('Only JSON files are allowed'), false)
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
})

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/api/upload', upload.single('wpscan-report'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const fileContent = req.file.buffer.toString('utf8')
    const reportData = JSON.parse(fileContent)

    // Basic validation
    if (!reportData.target_url || !reportData.version) {
      return res.status(400).json({ error: 'Invalid WPScan report format' })
    }

    res.json({
      success: true,
      data: reportData,
      message: 'Report uploaded successfully'
    })
  } catch (error) {
    console.error('Error processing upload:', error)
    res.status(400).json({
      error: 'Invalid JSON file or WPScan report format',
      details: error.message
    })
  }
})

// Error handling middleware
app.use((error, req, res, _next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ error: 'File too large. Maximum size is 50MB.' })
    }
  }
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.warn(`🚀 WP-Lens server running on http://localhost:${PORT}`)
  console.warn('📁 Serving static files from ./public')
})
