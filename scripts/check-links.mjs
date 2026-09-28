import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ does not exist. Run "npm run build" first.');
  process.exit(1);
}

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
let brokenLinks = 0;

console.log(`Checking links across ${htmlFiles.length} HTML files...`);

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  // Match internal links like href="/..."
  const regex = /href="(\/[^"#?]*)(?:#[^"]*)?(?:\?[^"]*)?"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const targetUrl = match[1];
    
    // Skip static assets with extensions if checked
    let possiblePaths = [
      path.join(distDir, targetUrl),
      path.join(distDir, targetUrl, 'index.html'),
    ];

    if (!targetUrl.includes('.') && !targetUrl.endsWith('/')) {
      possiblePaths.push(path.join(distDir, `${targetUrl}.html`));
    }

    const exists = possiblePaths.some(p => fs.existsSync(p));
    if (!exists) {
      console.error(`Broken link in ${path.relative(distDir, file)}: ${targetUrl}`);
      brokenLinks++;
    }
  }
}

if (brokenLinks > 0) {
  console.error(`Found ${brokenLinks} broken link(s)!`);
  process.exit(1);
} else {
  console.log('Zero broken links found.');
  process.exit(0);
}
