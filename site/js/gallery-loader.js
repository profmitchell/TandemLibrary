import { createCard, createEmptyCard } from "./card-builder.js";
import { FilterControls } from "./filter-controls.js";
import { filterAndSort } from "./filter-engine.js";

const EMPTY_COPY = {
  themes: "No themes yet. Drop a .tandemt file into /themes to get started.",
  configs: "No configs yet. Drop a .tandemc file into /configs to get started.",
};

let allThemes = [];
let allConfigs = [];
let themesFilterControls = null;
let configsFilterControls = null;

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

const renderSection = (items, grid, emptyCopy, viewMode = "cards") => {
  grid.innerHTML = "";
  grid.className = viewMode === "list" ? "gallery-list" : "gallery-grid";
  
  if (!items.length) {
    grid.appendChild(createEmptyCard(emptyCopy));
    return;
  }
  items.forEach((item, index) => {
    const card = createCard(item);
    card.style.setProperty("--card-index", index);
    if (viewMode === "list") {
      card.classList.add("card--list");
    }
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
  const themesFilterContainer = document.querySelector("#themes-filters");
  const configsFilterContainer = document.querySelector("#configs-filters");

  try {
    const data = await loadGallery();
    allThemes = data.themes || [];
    allConfigs = data.configs || [];

    themesCount.textContent = allThemes.length;
    configsCount.textContent = allConfigs.length;
    lastUpdated.textContent = formatTimestamp(data.generatedAt);

    // Initialize themes filters
    if (themesFilterContainer && allThemes.length > 0) {
      themesFilterControls = new FilterControls((filterState) => {
        const filtered = filterAndSort(allThemes, filterState);
        renderSection(filtered, themesGrid, EMPTY_COPY.themes, filterState.viewMode);
      });
      themesFilterControls.render(themesFilterContainer);
    }

    // Initialize configs filters
    if (configsFilterContainer && allConfigs.length > 0) {
      configsFilterControls = new FilterControls((filterState) => {
        const filtered = filterAndSort(allConfigs, filterState);
        renderSection(filtered, configsGrid, EMPTY_COPY.configs, filterState.viewMode);
      });
      configsFilterControls.render(configsFilterContainer);
    }

    renderSection(allThemes, themesGrid, EMPTY_COPY.themes);
    renderSection(allConfigs, configsGrid, EMPTY_COPY.configs);
  } catch (error) {
    showStatus("Unable to load the gallery. Try refreshing in a moment.", statusEl);
  }
};
