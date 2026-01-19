# Naming + Metadata

## Slug rules
- **Lowercase only** (`a-z`)
- **Numbers allowed** (`0-9`)
- **Hyphens only** as separators (no spaces or underscores)
- Keep slugs stable once published

## File + preview mapping
```
/themes/<slug>.tandemt
/configs/<slug>.tandemc
/previews/themes/<slug>.png  (or .jpg/.jpeg/.webp)
/previews/configs/<slug>.png (or .jpg/.jpeg/.webp)
```

## Metadata fields (optional but recommended)
The gallery attempts to read metadata from the file contents when possible.

### `.tandemt` (themes)
The generator checks for top-level JSON metadata and the first theme name.

**Preferred fields**:
- `metadata.title`
- `metadata.description`
- `metadata.tags` (array or comma-separated string)

**Fallback for title**:
- First theme name (e.g., `themes[0].name`)
- Filename slug (converted to Title Case)

**Example**:
```json
{
  "metadata": {
    "title": "Solaris",
    "description": "High-contrast solarized palette with crisp UI chrome.",
    "tags": ["dark", "solarized", "contrast"]
  },
  "themes": [
    { "name": "Solaris Night" }
  ]
}
```

### `.tandemc` (canvases/configs)
If the file is JSON, you can add a simple metadata block:

```json
{
  "metadata": {
    "title": "Studio Canvas",
    "description": "A clean workspace for long-form work."
  }
}
```

If no metadata is found, the gallery falls back to the filename slug.

### Non-JSON files (optional inline metadata)
If the file format allows comments, you can add a single-line JSON block anywhere:

```
@tandem-meta {"title":"Studio Canvas","description":"Clean workspace","tags":["grid","focus"]}
```

> Tags are displayed for themes only (configs ignore tags for now).

## Preview guidelines
- Use `.png`, `.jpg`, `.jpeg`, or `.webp`.
- Recommended size: **1600×1000** or similar widescreen ratio.
- Keep names identical to the slug.
