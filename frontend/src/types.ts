
export type Task = {
  id: string;
  text: string;
  done: boolean;
  dueDate: string;
  priority: "low" | "medium" | "high"
};

export type Filter = "all" | "active" | "completed";

export type SortOption = "dueDate" | "alphabetical" | "newest";