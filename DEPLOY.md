# Deploying to Vercel

## Quick Deploy (Recommended)

### Method 1: Using Vercel CLI

1. **Install Vercel CLI** (one-time setup):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - First time: Answer the setup questions
   - Follow-up deployments: Just run `vercel`

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard (No CLI needed)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push
   ```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**:
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `./`
   - Install Command: `npm install`
   
   (These are already set in `vercel.json`)

4. **Deploy**: Click "Deploy"

## What Happens During Deployment:

1. Vercel installs dependencies (`npm install`)
2. Runs build command (`npm run build` → minifies CSS/JS)
3. Deploys all files from root directory
4. Your site is live! 🚀

## Configuration Files:

- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `package.json` - Build scripts
- ✅ `.gitignore` - Updated for Vercel

## Features Enabled:

- **Automatic HTTPS**
- **Global CDN**
- **Caching**: Static assets cached for 1 year, HTML revalidated
- **Auto-deployments**: On every git push (if using GitHub integration)
- **Preview URLs**: For every branch/PR

## Custom Domain (Optional):

After deployment, you can add your domain:
1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration steps

## Important Notes:

- Minified files (`.min.css`, `.min.js`) are generated during build
- Don't commit minified files to Git (they're auto-generated)
- Each push creates a new preview deployment
- Use `vercel --prod` for production deployments

## Troubleshooting:

If deployment fails:
```bash
# Test build locally first
npm run build

# Check for errors
node minify.js
```

Need help? Check [Vercel docs](https://vercel.com/docs)
