const fs = require('fs');
const path = require('path');

// Get ENV from command-line argument
const ENV = process.argv[2];

if (!ENV) {
  console.error('Missing ENV argument');
  process.exit(1);
}

const jsonPath = path.join(__dirname, `../version.${ENV}.json`);

try {
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // Get current timestamp in YYYYMMDDHHMMSS format
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const timestamp =
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());

  // Update deployed timestamp
  jsonData.deployed = timestamp;

  // Write updated JSON back to the file
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));

  console.log(`Updated deployed date to: ${timestamp} in ${jsonPath}`);
} catch (err) {
  console.error(`Failed to update ${jsonPath}:`, err);
  process.exit(1);
}
