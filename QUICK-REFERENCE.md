# Quick Reference - Image & Video Optimization

## 📁 Where to Put Your Files

### ❌ WRONG - Don't put files here:
- `optimized/images/` - This is auto-generated, don't put files here
- `optimized/videos/` - This is auto-generated, don't put files here

### ✅ CORRECT - Put your files here:
- **Images**: Place in `images-original/` folder OR root directory
- **Videos**: Place in `videos-original/` folder OR root directory

## 🚀 Commands

### Optimize Everything
```bash
npm run build
```
Runs: Image optimization → Video optimization → CSS/JS minification

### Optimize Images Only (Skip Videos)
```bash
npm run optimize:images
```

### Optimize Videos Only (Skip Images)
```bash
npm run optimize:videos
```

### Optimize Both Images & Videos (No Minification)
```bash
npm run optimize
```

### Minify CSS & JS Only
```bash
npm run minify
```

## 📂 File Structure

```
your-project/
├── images-original/       ← PUT YOUR IMAGES HERE
├── videos-original/       ← PUT YOUR VIDEOS HERE
├── optimized/
│   ├── images/           ← Auto-generated (DON'T EDIT)
│   └── videos/           ← Auto-generated (DON'T EDIT)
├── style.css             ← Edit this
├── script.js             ← Edit this
├── style.min.css         ← Auto-generated (DON'T EDIT)
└── script.min.js         ← Auto-generated (DON'T EDIT)
```

## 🔄 Workflow Example

### Adding New Images:
1. Put images in `images-original/` folder
2. Run: `npm run optimize:images`
3. Use in HTML: `<img src="optimized/images/yourimage.jpg">`

### Adding New Videos:
1. Put videos in `videos-original/` folder
2. Run: `npm run optimize:videos`
3. Use in HTML: `<video src="optimized/videos/yourvideo.mp4">`

### Before Deployment:
```bash
npm run build
git add .
git commit -m "Update: optimized assets"
git push
```

## ⚡ Why This Matters

- **Images**: 80% quality, progressive loading
- **Videos**: H.264, max 1920x1080, 70-95% size reduction
- **CSS/JS**: Minified for faster loading
- **All optimizations run locally** - not on server!
