export const filterAndSort = (items, filterState) => {
  let filtered = [...items];

  // Filter by color category
  if (filterState.colorCategory !== "all") {
    filtered = filtered.filter(
      (item) => item.colorCategory === filterState.colorCategory
    );
  }

  // Filter by type (pack vs single)
  if (filterState.type === "pack") {
    filtered = filtered.filter((item) => item.isPack === true);
  } else if (filterState.type === "single") {
    filtered = filtered.filter((item) => item.isPack === false);
  }

  // Sort
  switch (filterState.sortBy) {
    case "title":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "updated":
      filtered.sort((a, b) => {
        const dateA = new Date(a.updatedAt || 0);
        const dateB = new Date(b.updatedAt || 0);
        return dateB - dateA;
      });
      break;
    case "updated-asc":
      filtered.sort((a, b) => {
        const dateA = new Date(a.updatedAt || 0);
        const dateB = new Date(b.updatedAt || 0);
        return dateA - dateB;
      });
      break;
  }

  return filtered;
};
