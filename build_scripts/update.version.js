const fs = require('fs');
const path = require('path');
const file = process.argv[2];
let env = process.argv[3];
const newVersionArg = process.argv[4];

if (!file || !env) {
  console.error(
    'Usage: node build_scripts/update.version.js <versionFile> <environment> [newVersion]',
  );
  process.exit(1);
}

if (!env) {
  env === 'production';
}

const versionFilePath = path.join(__dirname, '..', file);
const packageJsonFilePath = path.join(__dirname, '..', 'package.json');

if (!fs.existsSync(versionFilePath) || !fs.existsSync(packageJsonFilePath)) {
  console.error(`File not found: ${versionFilePath}`);
  process.exit(1);
}

const raw = fs.readFileSync(versionFilePath, 'utf8');
const rawPackageJson = fs.readFileSync(packageJsonFilePath, 'utf8');

const data = JSON.parse(raw);
const packageJsonData = JSON.parse(rawPackageJson);
let version = data.version || '0.0.0';

function bumpPatch(versionStr) {
  const parts = versionStr.split('.');
  const major = parseInt(parts[0] || '0', 10);
  const minor = parseInt(parts[1] || '0', 10);
  const patch = parseInt(parts[2] || '0', 10) + 1;
  return `${major}.${minor}.${patch}`;
}

if (newVersionArg) {
  version = newVersionArg;
} else {
  version = bumpPatch(version);
}

data.version = version;
fs.writeFileSync(versionFilePath, JSON.stringify(data, null, 2), 'utf8');
fs.writeFileSync(
  packageJsonFilePath,
  JSON.stringify({ ...packageJsonData, version }, null, 2),
  'utf8',
);
console.log(`Updated ${file} to version "${version}".`);

let distSrcDir = path.join(__dirname, '..', 'dist', 'src', env, 'src');
if (env === 'production') {
  distSrcDir = path.join(__dirname, '..', 'dist', 'src');
}

if (!fs.existsSync(distSrcDir)) {
  fs.mkdirSync(distSrcDir, { recursive: true });
}

const outputFilePath = path.join(distSrcDir, 'version.json');
fs.writeFileSync(outputFilePath, JSON.stringify({ version }, null, 2), 'utf8');
console.log(`Copied updated version "${version}" to ${outputFilePath}`);
