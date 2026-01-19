export class FilterControls {
  constructor(onFilterChange) {
    this.onFilterChange = onFilterChange;
    this.state = {
      colorCategory: "all",
      type: "all",
      viewMode: "cards",
      sortBy: "title",
    };
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.onFilterChange(this.state);
  }

  render(container) {
    container.innerHTML = `
      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Color</label>
          <select id="filter-color" class="filter-select">
            <option value="all">All Colors</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="cyan">Cyan</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            <option value="neutral">Neutral</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">Type</label>
          <select id="filter-type" class="filter-select">
            <option value="all">All Types</option>
            <option value="pack">Packs (Multi-theme)</option>
            <option value="single">Singles</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">Sort</label>
          <select id="filter-sort" class="filter-select">
            <option value="title">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="updated">Recently Updated</option>
            <option value="updated-asc">Oldest First</option>
          </select>
        </div>

        <div class="filter-group view-toggle">
          <label class="filter-label">View</label>
          <div class="view-buttons">
            <button id="view-cards" class="view-btn active" aria-label="Card view">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </button>
            <button id="view-list" class="view-btn" aria-label="List view">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachListeners(container);
  }

  attachListeners(container) {
    const colorSelect = container.querySelector("#filter-color");
    const typeSelect = container.querySelector("#filter-type");
    const sortSelect = container.querySelector("#filter-sort");
    const cardsBtn = container.querySelector("#view-cards");
    const listBtn = container.querySelector("#view-list");

    colorSelect.addEventListener("change", (e) => {
      this.setState({ colorCategory: e.target.value });
    });

    typeSelect.addEventListener("change", (e) => {
      this.setState({ type: e.target.value });
    });

    sortSelect.addEventListener("change", (e) => {
      this.setState({ sortBy: e.target.value });
    });

    cardsBtn.addEventListener("click", () => {
      this.setState({ viewMode: "cards" });
      cardsBtn.classList.add("active");
      listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
      this.setState({ viewMode: "list" });
      listBtn.classList.add("active");
      cardsBtn.classList.remove("active");
    });
  }
}
