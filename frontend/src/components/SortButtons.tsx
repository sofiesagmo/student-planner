
import type { SortOption } from "../types";

type SortButtonsProps = {
  sortOption: SortOption;
  setSortOption: (sortOption: SortOption) => void;
};

function SortButtons({
  sortOption,
  setSortOption,
}: SortButtonsProps) {
  return (
    <div className="sort-buttons">
      <button
        className={sortOption === "dueDate" ? "active-filter" : ""}
        onClick={() => setSortOption("dueDate")}
      >
        Due date
      </button>

      <button
        className={sortOption === "alphabetical" ? "active-filter" : ""}
        onClick={() => setSortOption("alphabetical")}
      >
        A-Z
      </button>

      <button
        className={sortOption === "newest" ? "active-filter" : ""}
        onClick={() => setSortOption("newest")}
      >
        Newest
      </button>
    </div>
  );
}

export default SortButtons;