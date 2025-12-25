# Build Instructions

## Minification Setup

Your website now has CSS and JS minification implemented!

### Files Created:
- `package.json` - Node.js dependencies
- `minify.js` - Minification script
- `.gitignore` - Excludes minified files from Git

### Current Results:
- **CSS**: Reduced from 15.10 KB to 10.48 KB (30.6% smaller)
- **JavaScript**: Reduced from 8.04 KB to 4.66 KB (42.0% smaller)

### How to Use:

1. **Make changes** to `style.css` or `script.js` (your source files)

2. **Run minification**:
   ```bash
   npm run minify
   ```

3. **Deploy**: The minified files (`style.min.css` and `script.min.js`) are automatically used by all HTML pages

### Important Notes:
- Always edit `style.css` and `script.js` (NOT the .min versions)
- The `.min` files are auto-generated and git-ignored
- Run `npm run minify` before deploying to production
- All HTML files have been updated to use the minified versions

### First Time Setup (already done):
```bash
npm install
npm run minify
```
