const fs = require('fs');
const path = require('path');

const token = process.argv[2];
if (!token) {
    console.error('Usage: node scripts/set-token.js <TOKEN>');
    process.exit(1);
}

const envPath = path.resolve(__dirname, '..', '.env');
const content = `TOKEN=${token}\nPORT=3000\n`;

try {
    fs.writeFileSync(envPath, content, { encoding: 'utf8', mode: 0o600 });
    console.log(`Wrote .env to ${envPath} (not committed)`);
} catch (err) {
    console.error('Failed to write .env:', err.message);
    process.exit(1);
}

process.exit(0);
