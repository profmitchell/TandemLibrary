const statusEl = document.querySelector("#status");
const themesGrid = document.querySelector("#themes-grid");
const configsGrid = document.querySelector("#configs-grid");
const themesCount = document.querySelector("#themes-count");
const configsCount = document.querySelector("#configs-count");
const lastUpdated = document.querySelector("#last-updated");

const EMPTY_COPY = {
  themes: "No themes yet. Drop a .tandemt file into /themes to get started.",
  configs: "No configs yet. Drop a .tandemc file into /configs to get started.",
};

const formatTimestamp = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const createPlaceholder = (colors) => {
  const placeholder = document.createElement("div");
  placeholder.className = "card__placeholder";
  
  if (colors && colors.length >= 3) {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    
    const gradient = ctx.createRadialGradient(200, 150, 50, 400, 250, 600);
    gradient.addColorStop(0, colors[0] || "#333");
    gradient.addColorStop(0.3, colors[1] || "#444");
    gradient.addColorStop(0.6, colors[2] || "#555");
    if (colors[3]) gradient.addColorStop(0.85, colors[3]);
    gradient.addColorStop(1, colors[colors.length - 1] || "#222");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 500);
    
    const gradient2 = ctx.createRadialGradient(600, 350, 100, 300, 200, 500);
    gradient2.addColorStop(0, colors[Math.min(2, colors.length - 1)] + "80");
    gradient2.addColorStop(1, "transparent");
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, 800, 500);
    
    placeholder.appendChild(canvas);
  } else {
    placeholder.innerHTML = "<span>Preview coming soon</span>";
  }
  
  return placeholder;
};

const createTag = (text) => {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = text;
  return tag;
};

const createCard = (item) => {
  const card = document.createElement("article");
  card.className = "card";

  const media = document.createElement("div");
  media.className = "card__media";

  if (item.previewUrl) {
    const img = document.createElement("img");
    img.src = item.previewUrl;
    img.alt = `${item.title} preview`;
    img.loading = "lazy";
    img.onerror = () => {
      media.innerHTML = "";
      media.appendChild(createPlaceholder(item.colors));
    };
    media.appendChild(img);
  } else {
    media.appendChild(createPlaceholder(item.colors));
  }

  const body = document.createElement("div");
  body.className = "card__body";

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = item.title;

  const desc = document.createElement("p");
  desc.className = "card__desc";
  desc.textContent = item.description || "No description yet.";

  body.appendChild(title);
  body.appendChild(desc);

  if (item.tags && item.tags.length) {
    const tagRow = document.createElement("div");
    tagRow.className = "tag-row";
    item.tags.forEach((tag) => tagRow.appendChild(createTag(tag)));
    body.appendChild(tagRow);
  }

  const footer = document.createElement("div");
  footer.className = "card__footer";

  const download = document.createElement("a");
  download.className = "button primary";
  download.href = item.downloadUrl;
  download.target = "_blank";
  download.rel = "noreferrer";
  download.textContent = "Download";

  const source = document.createElement("a");
  source.className = "button ghost";
  source.href = item.sourceUrl;
  source.target = "_blank";
  source.rel = "noreferrer";
  source.textContent = "View Source";

  footer.appendChild(download);
  footer.appendChild(source);

  card.appendChild(media);
  card.appendChild(body);
  card.appendChild(footer);

  return card;
};

const createEmptyCard = (message) => {
  const card = document.createElement("article");
  card.className = "card";

  const media = document.createElement("div");
  media.className = "card__media";
  media.appendChild(createPlaceholder(null));

  const body = document.createElement("div");
  body.className = "card__body";

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = "Coming soon";

  const desc = document.createElement("p");
  desc.className = "card__desc";
  desc.textContent = message;

  body.appendChild(title);
  body.appendChild(desc);

  card.appendChild(media);
  card.appendChild(body);

  return card;
};

const renderSection = (items, grid, emptyCopy) => {
  grid.innerHTML = "";
  if (!items.length) {
    grid.appendChild(createEmptyCard(emptyCopy));
    return;
  }
  items.forEach((item, index) => {
    const card = createCard(item);
    card.style.setProperty("--card-index", index);
    grid.appendChild(card);
  });
};

const showStatus = (message) => {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.add("show");
};

const loadGallery = async () => {
  const response = await fetch("./data/gallery.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Gallery data not found.");
  }
  return response.json();
};

const init = async () => {
  try {
    const data = await loadGallery();
    const themes = data.themes || [];
    const configs = data.configs || [];

    themesCount.textContent = themes.length;
    configsCount.textContent = configs.length;
    lastUpdated.textContent = formatTimestamp(data.generatedAt);

    renderSection(themes, themesGrid, EMPTY_COPY.themes);
    renderSection(configs, configsGrid, EMPTY_COPY.configs);
  } catch (error) {
    showStatus("Unable to load the gallery. Try refreshing in a moment.");
  }
};

document.addEventListener("DOMContentLoaded", init);
