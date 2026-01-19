# Tandem Library

Tandem Library is a curated collection of Tandem themes (`.tandemt`) and canvases/configs (`.tandemc`) with preview images and one-click downloads.

## Gallery
Visit the GitHub Pages gallery: **https://YOUR_GITHUB_USERNAME.github.io/TandemLibrary/**

## How to download + open in Tandem
1. Open the gallery and pick a theme or config.
2. Click **Download** to save the `.tandemt` or `.tandemc` file.
3. In Tandem, choose **Import/Install** (or drag the file into the app).
4. Apply the theme or config from your library.

## Repo structure
```
/themes/                # .tandemt theme files
/configs/               # .tandemc canvas/config files
/previews/themes/       # preview images for themes (match slug)
/previews/configs/      # preview images for configs (match slug)
/site/                  # GitHub Pages site source
/docs/                  # documentation
```

## Naming rules (slug-based)
- **Slug format:** lowercase `a-z`, `0-9`, and hyphens only (no spaces).
- Theme file: `/themes/<slug>.tandemt`
- Config file: `/configs/<slug>.tandemc`
- Preview image: `/previews/themes/<slug>.png` (or `.jpg`, `.jpeg`, `.webp`)
- Preview image: `/previews/configs/<slug>.png` (or `.jpg`, `.jpeg`, `.webp`)

Full rules and metadata examples: **/docs/Naming.md**

## Add a new theme
1. Add the theme file: `/themes/<slug>.tandemt`
2. Add the preview image: `/previews/themes/<slug>.png`
3. Commit + push to `main` → Pages rebuilds automatically.

## Add a new config
1. Add the config file: `/configs/<slug>.tandemc`
2. Add the preview image: `/previews/configs/<slug>.png`
3. Commit + push to `main` → Pages rebuilds automatically.

## Publishing checklist
- [ ] Slug uses lowercase letters, numbers, and hyphens only.
- [ ] `.tandemt` or `.tandemc` file is in the correct folder.
- [ ] Preview image matches the slug exactly.
- [ ] Optional metadata (title/description/tags) is included if available.
- [ ] Push to `main` and wait for GitHub Pages to deploy.

## Contributing
This library is curated only. Submissions are disabled for now.

## Docs
- **Importing:** /docs/Importing.md
- **Naming + metadata:** /docs/Naming.md
- **FAQ:** /docs/FAQ.md

## GitHub Pages setup
This repo uses a GitHub Actions workflow to build the gallery data and deploy `/site`.
Enable **Settings → Pages → Source: GitHub Actions** in your repo.
