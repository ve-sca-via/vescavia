const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const shouldOptimizeImages = args.includes('--images') || args.includes('--both') || args.length === 0;
const shouldOptimizeVideos = args.includes('--videos') || args.includes('--both') || args.length === 0;

console.log('🎨 Starting optimization process...\n');

if (args.includes('--images')) {
    console.log('📋 Mode: Images only\n');
} else if (args.includes('--videos')) {
    console.log('📋 Mode: Videos only\n');
} else {
    console.log('📋 Mode: Both images and videos\n');
}

// Check if required tools are available
function checkDependencies() {
    const required = [];
    
    // Only check for ffmpeg if we're optimizing videos
    if (shouldOptimizeVideos) {
        try {
            execSync('ffmpeg -version', { stdio: 'ignore' });
        } catch {
            required.push('ffmpeg');
        }
    }
    
    if (required.length > 0) {
        console.error('❌ Missing required tools:');
        required.forEach(tool => console.error(`   - ${tool}`));
        console.error('\n📦 Install instructions:');
        if (required.includes('ffmpeg')) {
            console.error('   Windows: choco install ffmpeg (or download from ffmpeg.org)');
            console.error('   Mac: brew install ffmpeg');
            console.error('   Linux: sudo apt install ffmpeg');
        }
        process.exit(1);
    }
}

// Create optimized and source directories if they don't exist
function ensureDirectories() {
    const dirs = [
        path.join(__dirname, 'optimized'),
        path.join(__dirname, 'optimized', 'images'),
        path.join(__dirname, 'optimized', 'videos'),
        path.join(__dirname, 'images-original'),
        path.join(__dirname, 'videos-original')
    ];
    
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

// Get all files with specific extensions from a directory
function getFilesWithExtensions(dir, extensions) {
    if (!fs.existsSync(dir)) {
        return [];
    }
    
    const files = fs.readdirSync(dir);
    return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return extensions.includes(ext);
    });
}

// Optimize images using sharp (if available) or imagemagick
async function optimizeImages() {
    console.log('🖼️  Optimizing images...\n');
    
    // Check for images in root directory and images-original folder
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const rootImages = getFilesWithExtensions(__dirname, imageExtensions);
    const originalDir = path.join(__dirname, 'images-original');
    const originalImages = getFilesWithExtensions(originalDir, imageExtensions);
    
    const allImages = [
        ...rootImages.map(img => ({ file: img, source: __dirname })),
        ...originalImages.map(img => ({ file: img, source: originalDir }))
    ];
    
    if (allImages.length === 0) {
        console.log('   ℹ️  No new images found in root or images-original/ directory\n');
        return;
    }
    
    let optimizedCount = 0;
    
    for (const { file, source } of allImages) {
        const inputPath = path.join(source, file);
        const outputPath = path.join(__dirname, 'optimized', 'images', file);
        const ext = path.extname(file).toLowerCase();
        
        try {
            const inputStats = fs.statSync(inputPath);
            const inputSize = inputStats.size;
            
            // Use sharp if available, otherwise use imagemagick
            let useSharp = false;
            try {
                require.resolve('sharp');
                useSharp = true;
            } catch {}
            
            if (useSharp) {
                const sharp = require('sharp');
                
                if (ext === '.png') {
                    await sharp(inputPath)
                        .png({ quality: 80, compressionLevel: 9 })
                        .toFile(outputPath);
                } else if (ext === '.webp') {
                    await sharp(inputPath)
                        .webp({ quality: 80 })
                        .toFile(outputPath);
                } else {
                    // JPG/JPEG
                    await sharp(inputPath)
                        .jpeg({ quality: 80, progressive: true })
                        .toFile(outputPath);
                }
            } else {
                // Fallback: just copy the file
                fs.copyFileSync(inputPath, outputPath);
                console.log(`   ⚠️  ${file} - copied (install 'sharp' for optimization)`);
                optimizedCount++;
                continue;
            }
            
            const outputStats = fs.statSync(outputPath);
            const outputSize = outputStats.size;
            const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
            
            console.log(`   ✅ ${file}`);
            console.log(`      ${(inputSize / 1024).toFixed(2)} KB → ${(outputSize / 1024).toFixed(2)} KB (${reduction}% smaller)`);
            optimizedCount++;
            
        } catch (error) {
            console.error(`   ❌ Failed to optimize ${file}:`, error.message);
        }
    }
    
    console.log(`\n   📊 Optimized ${optimizedCount} of ${allImages.length} images\n`);
}

// Optimize videos using ffmpeg
async function optimizeVideos() {
    console.log('🎥 Optimizing videos...\n');
    
    // Check for videos in root directory and videos-original
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm'];
    const rootVideos = getFilesWithExtensions(__dirname, videoExtensions);
    const originalDir = path.join(__dirname, 'videos-original');
    const originalVideos = getFilesWithExtensions(originalDir, videoExtensions);
    
    const allVideos = [
        ...rootVideos.map(v => ({ file: v, source: __dirname })),
        ...originalVideos.map(v => ({ file: v, source: originalDir }))
    ];
    
    if (allVideos.length === 0) {
        console.log('   ℹ️  No new videos found\n');
        return;
    }
    
    let optimizedCount = 0;
    
    for (const { file, source } of allVideos) {
        const inputPath = path.join(source, file);
        const outputName = path.basename(file, path.extname(file)) + '.mp4';
        const outputPath = path.join(__dirname, 'optimized', 'videos', outputName);
        
        try {
            const inputStats = fs.statSync(inputPath);
            const inputSize = inputStats.size;
            
            console.log(`   ⏳ Processing ${file}...`);
            
            // Optimize video with ffmpeg
            // - Lower bitrate for web delivery
            // - H.264 codec for broad compatibility
            // - Resize if too large (max 1920x1080)
            // - Force dimensions divisible by 2 for H.264 compatibility
            const ffmpegCmd = `ffmpeg -i "${inputPath}" -c:v libx264 -preset medium -crf 28 -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2" -c:a aac -b:a 128k -movflags +faststart -y "${outputPath}"`;
            
            execSync(ffmpegCmd, { stdio: 'ignore' });
            
            const outputStats = fs.statSync(outputPath);
            const outputSize = outputStats.size;
            const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
            
            console.log(`   ✅ ${file}`);
            console.log(`      ${(inputSize / 1024 / 1024).toFixed(2)} MB → ${(outputSize / 1024 / 1024).toFixed(2)} MB (${reduction}% smaller)`);
            optimizedCount++;
            
        } catch (error) {
            console.error(`   ❌ Failed to optimize ${file}:`, error.message);
        }
    }
    
    console.log(`\n   📊 Optimized ${optimizedCount} of ${allVideos.length} videos\n`);
}

// Main optimization function
(async () => {
    try {
        checkDependencies();
        ensureDirectories();
        
        if (shouldOptimizeImages) {
            await optimizeImages();
        }
        
        if (shouldOptimizeVideos) {
            await optimizeVideos();
        }
        
        console.log('🎉 Optimization complete!\n');
        console.log('📝 Usage options:');
        console.log('   npm run optimize           - Optimize both images and videos');
        console.log('   npm run optimize:images    - Optimize images only');
        console.log('   npm run optimize:videos    - Optimize videos only\n');
        console.log('📝 Next steps:');
        console.log('   1. Check the optimized/ folder for your optimized assets');
        console.log('   2. Update your HTML to reference optimized/images/ and optimized/videos/');
        console.log('   3. Run "npm run build" before deployment\n');
        
    } catch (error) {
        console.error('❌ Optimization failed:', error);
        process.exit(1);
    }
})();
