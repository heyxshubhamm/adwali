const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'out');
const rootDest = __dirname;
const publicHtmlDest = path.join(__dirname, 'public_html');

// Protected source paths at the root that we should NEVER delete or overwrite
const protectedPaths = ['app', 'components', 'lib', 'content', 'public', 'node_modules', '.git', 'package.json', 'package-lock.json', 'next.config.mjs', 'postcss.config.js', 'tailwind.config.js', 'jsconfig.json', 'README.md', 'sync-build.js', '.gitignore'];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (!fs.existsSync(srcDir)) {
  console.error('Error: "out" directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

// 1. Clean public_html completely before copying
console.log('Cleaning public_html directory...');
if (fs.existsSync(publicHtmlDest)) {
  fs.rmSync(publicHtmlDest, { recursive: true, force: true });
}
fs.mkdirSync(publicHtmlDest, { recursive: true });

// 2. Sync all items in out/ to root and public_html
const items = fs.readdirSync(srcDir);
items.forEach(item => {
  const itemSrc = path.join(srcDir, item);
  
  // Clean and sync to root (excluding protected paths)
  if (!protectedPaths.includes(item)) {
    const itemRootDest = path.join(rootDest, item);
    if (fs.existsSync(itemRootDest)) {
      fs.rmSync(itemRootDest, { recursive: true, force: true });
    }
    console.log(`Syncing ${item} to root...`);
    copyRecursiveSync(itemSrc, itemRootDest);
  }

  // Sync to public_html
  const itemPublicHtmlDest = path.join(publicHtmlDest, item);
  copyRecursiveSync(itemSrc, itemPublicHtmlDest);
});

console.log('Build synchronization complete!');
