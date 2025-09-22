const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Generate different sizes
const sizes = [64, 128, 256, 512];

async function generateLogos() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/logo.svg'));
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size * 2.5, size) // Keep the aspect ratio
      .toFile(path.join(__dirname, `../public/logo-${size}.png`));
  }
}

generateLogos().catch(console.error);
