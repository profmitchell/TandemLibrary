import { createCard, createEmptyCard } from "./card-builder.js";

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

const showStatus = (message, statusEl) => {
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

export const initGallery = async () => {
  const statusEl = document.querySelector("#status");
  const themesGrid = document.querySelector("#themes-grid");
  const configsGrid = document.querySelector("#configs-grid");
  const themesCount = document.querySelector("#themes-count");
  const configsCount = document.querySelector("#configs-count");
  const lastUpdated = document.querySelector("#last-updated");

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
    showStatus("Unable to load the gallery. Try refreshing in a moment.", statusEl);
  }
};
