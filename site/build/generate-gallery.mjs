import fs from "fs";
import path from "path";

const root = process.cwd();
const repo =
  process.env.GITHUB_REPOSITORY || "YOUR_GITHUB_USERNAME/TandemLibrary";
const branch =
  process.env.GALLERY_BRANCH || process.env.GITHUB_REF_NAME || "main";

const rawBase = `https://raw.githubusercontent.com/${repo}/${branch}`;
const blobBase = `https://github.com/${repo}/blob/${branch}`;

const PREVIEW_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

const themesDir = path.join(root, "themes");
const configsDir = path.join(root, "configs");
const previewsThemesDir = path.join(root, "previews", "themes");
const previewsConfigsDir = path.join(root, "previews", "configs");
const outputDir = path.join(root, "site", "data");
const outputFile = path.join(outputDir, "gallery.json");

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const listFiles = (dir, extension) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((entry) => entry.toLowerCase().endsWith(extension))
    .sort((a, b) => a.localeCompare(b));
};

const slugFromFilename = (filename, extension) =>
  path.basename(filename, extension);

const toTitleCase = (slug) =>
  slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const readFileSafe = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
};

const parseJsonMaybe = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const parseInlineMeta = (text) => {
  const match = text.match(/@tandem-meta\s+(\{[\s\S]*?\})/);
  if (!match) return null;
  return parseJsonMaybe(match[1]);
};

const parseDslValue = (value) => {
  if (!value) return "";
  const trimmed = value.trim();
  const isQuoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));
  if (isQuoted) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const normalized = trimmed.replace(/'/g, '"');
      return JSON.parse(normalized);
    } catch {
      return trimmed;
    }
  }
  return trimmed;
};

const parseThemeDsl = (text) => {
  const lines = text.split(/\r?\n/);
  let inMeta = false;
  let inThemes = false;
  const metadata = {};
  let themeName = null;

  for (const line of lines) {
    if (!inMeta && /^\s*metadata:\s*$/.test(line)) {
      inMeta = true;
      continue;
    }
    if (!inThemes && /^\s*themes:\s*$/.test(line)) {
      inThemes = true;
      continue;
    }

    if (inMeta) {
      if (!line.startsWith("  ") && line.trim() !== "") {
        inMeta = false;
      } else {
        const match = line.match(/^\s{2}([A-Za-z0-9_-]+):\s*(.+)$/);
        if (match) {
          metadata[match[1]] = parseDslValue(match[2]);
        }
        continue;
      }
    }

    if (inThemes && !themeName) {
      const match = line.match(/^\s*-\s*name:\s*(.+)$/);
      if (match) {
        themeName = parseDslValue(match[1]);
      }
    }
  }

  const colorMatches = text.match(/#[A-Fa-f0-9]{6}/g);
  const colors = colorMatches ? colorMatches.slice(0, 6) : [];

  if (!Object.keys(metadata).length && !themeName) return null;
  return { metadata, themeName, colors };
};

const normalizeTags = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
};

const findPreview = (slug, previewDir, previewRel) => {
  for (const extension of PREVIEW_EXTENSIONS) {
    const candidate = path.join(previewDir, `${slug}${extension}`);
    if (fs.existsSync(candidate)) {
      return `${rawBase}/${previewRel}/${slug}${extension}`;
    }
  }
  return null;
};

const buildItem = ({
  filename,
  extension,
  type,
  directory,
  directoryRel,
  previewDir,
  previewRel,
}) => {
  const slug = slugFromFilename(filename, extension);
  const filePath = path.join(directory, filename);
  const content = readFileSafe(filePath);
  const jsonData = parseJsonMaybe(content);
  const dslData = jsonData ? null : parseThemeDsl(content);
  const inlineMeta = parseInlineMeta(content);
  const metadata = {
    ...(jsonData?.metadata || {}),
    ...(dslData?.metadata || {}),
    ...(inlineMeta || {}),
  };

  const themeName = jsonData?.themes?.[0]?.name || dslData?.themeName;
  const title =
    metadata.title ||
    metadata.name ||
    (type === "theme" ? themeName : null) ||
    toTitleCase(slug);
  const description =
    metadata.description ||
    (type === "theme" ? "Tandem theme." : "Tandem canvas/config.");
  const tags = type === "theme" ? normalizeTags(metadata.tags) : [];
  const colors = dslData?.colors || [];
  const previewUrl = findPreview(slug, previewDir, previewRel);
  const downloadUrl = `${rawBase}/${directoryRel}/${filename}`;
  const sourceUrl = `${blobBase}/${directoryRel}/${filename}`;
  const stats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;

  return {
    slug,
    title,
    description,
    tags,
    colors,
    previewUrl,
    downloadUrl,
    sourceUrl,
    updatedAt: stats ? stats.mtime.toISOString() : null,
  };
};

const buildSection = (options) => {
  const files = listFiles(options.directory, options.extension);
  return files
    .map((filename) => buildItem({ ...options, filename }))
    .sort((a, b) => a.title.localeCompare(b.title));
};

const themes = buildSection({
  directory: themesDir,
  directoryRel: "themes",
  extension: ".tandemt",
  type: "theme",
  previewDir: previewsThemesDir,
  previewRel: "previews/themes",
});

const configs = buildSection({
  directory: configsDir,
  directoryRel: "configs",
  extension: ".tandemc",
  type: "config",
  previewDir: previewsConfigsDir,
  previewRel: "previews/configs",
});

const payload = {
  generatedAt: new Date().toISOString(),
  repo,
  branch,
  themes,
  configs,
};

ensureDir(outputDir);
fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2));
console.log(
  `Generated ${outputFile} with ${themes.length} themes and ${configs.length} configs.`
);
