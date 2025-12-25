const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify } = require('terser');

console.log('🚀 Starting minification process...\n');

// Minify CSS
async function minifyCSS() {
    try {
        const cssFile = path.join(__dirname, 'style.css');
        const cssContent = fs.readFileSync(cssFile, 'utf8');
        const originalSize = Buffer.byteLength(cssContent, 'utf8');
        
        const output = new CleanCSS({
            level: 2,
            sourceMap: false
        }).minify(cssContent);
        
        if (output.errors.length > 0) {
            console.error('❌ CSS Errors:', output.errors);
            return;
        }
        
        const minifiedFile = path.join(__dirname, 'style.min.css');
        fs.writeFileSync(minifiedFile, output.styles);
        
        const minifiedSize = Buffer.byteLength(output.styles, 'utf8');
        const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        
        console.log('✅ CSS minified successfully!');
        console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`   Minified: ${(minifiedSize / 1024).toFixed(2)} KB`);
        console.log(`   Saved: ${reduction}%\n`);
    } catch (error) {
        console.error('❌ CSS minification failed:', error.message);
    }
}

// Minify JavaScript
async function minifyJS() {
    try {
        const jsFile = path.join(__dirname, 'script.js');
        const jsContent = fs.readFileSync(jsFile, 'utf8');
        const originalSize = Buffer.byteLength(jsContent, 'utf8');
        
        const result = await minify(jsContent, {
            compress: {
                dead_code: true,
                drop_console: false,
                drop_debugger: true,
                keep_classnames: true,
                keep_fnames: false
            },
            mangle: {
                keep_classnames: true
            },
            format: {
                comments: false
            }
        });
        
        if (result.error) {
            console.error('❌ JS Error:', result.error);
            return;
        }
        
        const minifiedFile = path.join(__dirname, 'script.min.js');
        fs.writeFileSync(minifiedFile, result.code);
        
        const minifiedSize = Buffer.byteLength(result.code, 'utf8');
        const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        
        console.log('✅ JavaScript minified successfully!');
        console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`   Minified: ${(minifiedSize / 1024).toFixed(2)} KB`);
        console.log(`   Saved: ${reduction}%\n`);
    } catch (error) {
        console.error('❌ JS minification failed:', error.message);
    }
}

// Run minification
(async () => {
    await minifyCSS();
    await minifyJS();
    console.log('🎉 Minification complete!\n');
    console.log('📝 Next steps:');
    console.log('   1. Update your HTML files to use style.min.css and script.min.js');
    console.log('   2. Run "npm run minify" whenever you update your CSS/JS files');
})();
