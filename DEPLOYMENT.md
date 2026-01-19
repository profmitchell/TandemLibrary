# GitHub Pages Deployment Guide

## Initial Setup (one-time)

### 1. Push your repo to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Tandem Library"
git branch -M main
git remote add origin https://github.com/profmitchell/TandemLibrary.git
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repo: **https://github.com/profmitchell/TandemLibrary**
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**
5. Save

### 3. Trigger the workflow
The workflow runs automatically on push to `main`, but you can also:
1. Go to **Actions** tab
2. Click **Deploy GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### 4. Wait for deployment
- The workflow takes 1-2 minutes
- Check the **Actions** tab for progress
- Once complete, your site will be live at: **https://profmitchell.github.io/TandemLibrary/**

## Download URLs Explained

Downloads work via GitHub's raw file URLs:
```
https://raw.githubusercontent.com/profmitchell/TandemLibrary/main/themes/<filename>.tandemt
```

**Why downloads might 404:**
- The repo isn't pushed to GitHub yet
- The files aren't in the `main` branch
- The repo is private (raw URLs require public repos)

**Fix:**
1. Make sure your repo is **public** (Settings → Danger Zone → Change visibility)
2. Push all theme files to the `main` branch
3. Wait for GitHub to sync (usually instant)

## Adding New Themes

1. Add theme file: `/themes/<slug>.tandemt`
2. (Optional) Add preview: `/previews/themes/<slug>.png`
3. Commit and push:
   ```bash
   git add themes/ previews/
   git commit -m "Add new theme: <slug>"
   git push
   ```
4. GitHub Actions rebuilds the gallery automatically
5. Wait 1-2 minutes, then refresh your Pages site

## Troubleshooting

### Downloads return 404
- **Check:** Is your repo public?
- **Check:** Are the files in the `main` branch on GitHub?
- **Check:** Does the URL match exactly? (case-sensitive)

### Gallery doesn't update
- **Check:** Did the Actions workflow succeed? (Actions tab)
- **Check:** Did you push to `main`?
- **Check:** Hard refresh the Pages site (Cmd+Shift+R / Ctrl+Shift+F5)

### Workflow fails
- **Check:** Is the workflow file valid YAML?
- **Check:** Are Pages enabled with "GitHub Actions" source?
- **Check:** Does the repo have Actions enabled? (Settings → Actions → Allow all actions)

## Manual Regeneration

To regenerate `gallery.json` locally:
```bash
node site/build/generate-gallery.mjs
```

This is useful for testing before pushing.
