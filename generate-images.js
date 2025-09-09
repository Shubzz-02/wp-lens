const { createCanvas } = require('canvas')
const fs = require('fs')

// Create favicon (32x32)
function createFavicon () {
  const canvas = createCanvas(32, 32)
  const ctx = canvas.getContext('2d')

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 32, 32)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(1, '#764ba2')

  // Background with rounded corners effect
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)

  // Main lens circle (white)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.beginPath()
  ctx.arc(16, 12, 6, 0, 2 * Math.PI)
  ctx.fill()

  // Inner lens circle (blue)
  ctx.fillStyle = '#667eea'
  ctx.beginPath()
  ctx.arc(16, 12, 3, 0, 2 * Math.PI)
  ctx.fill()

  // Bottom lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillRect(10, 20, 12, 2)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillRect(12, 24, 8, 2)

  // Save favicon
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('public/favicon.png', buffer)
  console.log('Favicon created successfully')
}

// Create OG Image (1200x630)
function createOGImage () {
  const canvas = createCanvas(1200, 630)
  const ctx = canvas.getContext('2d')

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(1, '#764ba2')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1200, 630)

  // Main lens icon (left side)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.beginPath()
  ctx.arc(300, 315, 80, 0, 2 * Math.PI)
  ctx.fill()

  ctx.fillStyle = '#667eea'
  ctx.beginPath()
  ctx.arc(300, 315, 40, 0, 2 * Math.PI)
  ctx.fill()

  // Text
  ctx.fillStyle = 'white'
  ctx.font = 'bold 72px Arial, sans-serif'
  ctx.fillText('WP-Lens', 450, 280)

  ctx.font = '32px Arial, sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillText('WordPress Security Scanner', 450, 340)
  ctx.fillText('Report Viewer', 450, 380)

  // Decorative line
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillRect(450, 420, 400, 3)

  // Decorative dots
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.beginPath()
  ctx.arc(480, 480, 8, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(520, 480, 8, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(560, 480, 8, 0, 2 * Math.PI)
  ctx.fill()

  // Save OG image
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('public/og-image.png', buffer)
  console.log('OG Image created successfully')
}

// Generate both images
createFavicon()
createOGImage()
console.log('All images generated successfully!')
