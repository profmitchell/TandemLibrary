# Tandem Library workflow

## GitHub Pages configuration
- **Source:** Settings → Pages → **GitHub Actions**
- The workflow publishes the `/site` folder.
- Update `YOUR_GITHUB_USERNAME` references once the repo is created.

## How to add a new theme
1. Create a slug (lowercase + hyphens): `my-theme-name`.
2. Add `/themes/my-theme-name.tandemt`.
3. Add `/previews/themes/my-theme-name.png`.
4. Commit + push to `main`. The gallery rebuilds automatically.

## How to add a new config
1. Create a slug (lowercase + hyphens): `my-config-name`.
2. Add `/configs/my-config-name.tandemc`.
3. Add `/previews/configs/my-config-name.png`.
4. Commit + push to `main`. The gallery rebuilds automatically.

## Publishing checklist
- [ ] Slug uses lowercase letters, numbers, and hyphens only.
- [ ] File extension is correct (`.tandemt` or `.tandemc`).
- [ ] Preview image exists and matches the slug exactly.
- [ ] Optional metadata is included (title/description/tags).
- [ ] Push to `main` and confirm the Pages workflow succeeds.

## Naming rules + metadata
See **/docs/Naming.md** for the full rules and metadata examples.
