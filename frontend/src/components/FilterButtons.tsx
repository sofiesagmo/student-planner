
type Filter = "all" | "active" | "completed";

type FilterButtonsProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

function FilterButtons({
  filter,
  setFilter,
}: FilterButtonsProps) {
  return (
    <div className="filter-buttons">
      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "active" ? "active-filter" : ""}
        onClick={() => setFilter("active")}
      >
        Active
      </button>

      <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterButtons;