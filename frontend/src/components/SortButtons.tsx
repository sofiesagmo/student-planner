
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
      <label htmlFor="sort-select">Sort by:</label>

      <select
        id="sort-select"
        value={sortOption}
        onChange={(e) =>
          setSortOption(e.target.value as SortOption)
        }
      >
        <option value="dueDate">Due date</option>
        <option value="alphabetical">A-Z</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

export default SortButtons;