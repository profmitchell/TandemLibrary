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
        <div class="filter-section">
          <label class="filter-label">Color</label>
          <div class="filter-pills" id="color-pills">
            <button class="pill active" data-value="all">All</button>
            <button class="pill" data-value="red">Red</button>
            <button class="pill" data-value="orange">Orange</button>
            <button class="pill" data-value="yellow">Yellow</button>
            <button class="pill" data-value="green">Green</button>
            <button class="pill" data-value="cyan">Cyan</button>
            <button class="pill" data-value="blue">Blue</button>
            <button class="pill" data-value="purple">Purple</button>
            <button class="pill" data-value="pink">Pink</button>
            <button class="pill" data-value="neutral">Neutral</button>
            <button class="pill" data-value="light">Light</button>
            <button class="pill" data-value="dark">Dark</button>
          </div>
        </div>

        <div class="filter-section">
          <label class="filter-label">Type</label>
          <div class="filter-pills" id="type-pills">
            <button class="pill active" data-value="all">All</button>
            <button class="pill" data-value="pack">Packs</button>
            <button class="pill" data-value="single">Singles</button>
          </div>
        </div>

        <div class="filter-section">
          <label class="filter-label">Sort</label>
          <div class="filter-pills" id="sort-pills">
            <button class="pill active" data-value="title">A-Z</button>
            <button class="pill" data-value="title-desc">Z-A</button>
            <button class="pill" data-value="updated">Recent</button>
            <button class="pill" data-value="updated-asc">Oldest</button>
          </div>
        </div>

        <div class="filter-section view-toggle">
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
    const colorPills = container.querySelector("#color-pills");
    const typePills = container.querySelector("#type-pills");
    const sortPills = container.querySelector("#sort-pills");
    const cardsBtn = container.querySelector("#view-cards");
    const listBtn = container.querySelector("#view-list");

    const handlePillClick = (pillContainer, stateKey) => {
      pillContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("pill")) {
          pillContainer.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
          e.target.classList.add("active");
          this.setState({ [stateKey]: e.target.dataset.value });
        }
      });
    };

    handlePillClick(colorPills, "colorCategory");
    handlePillClick(typePills, "type");
    handlePillClick(sortPills, "sortBy");

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
