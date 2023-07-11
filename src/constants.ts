export const COLORS = ["black", "gold", "blue", "green", "fuchsia"];

export const REPEATING_DAYS = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

export const DEFAULT_TODO = {
  id: "",
  color: "black",
  description: "",
  dueDate: null,
  createdAt: null,
  updatedAt: null,
  isArchived: false,
  isFavorite: false,
  repeatingDays: REPEATING_DAYS,
};
