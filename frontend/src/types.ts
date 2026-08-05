
export type Task = {
  id: string;
  text: string;
  done: boolean;
  dueDate: string;
  createdAt: string;
};

export type Filter = "all" | "active" | "completed";

export type SortOption = "dueDate" | "alphabetical" | "createdAt";