import { createGradient } from "./gradient-generator.js";
import { createDownloadHandler } from "./download-handler.js";

const createPlaceholder = (colors) => {
  const placeholder = document.createElement("div");
  placeholder.className = "card__placeholder";

  const canvas = createGradient(colors);
  if (canvas) {
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

export const createCard = (item) => {
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

  const download = document.createElement("button");
  download.className = "button primary";
  download.textContent = "Download";
  const filename = `${item.slug}.${item.downloadUrl.endsWith('.tandemc') ? 'tandemc' : 'tandemt'}`;
  download.addEventListener("click", createDownloadHandler(item.downloadUrl, filename));

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

export const createEmptyCard = (message) => {
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
