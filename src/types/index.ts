import { Timestamp } from "firebase/firestore";

export interface RepeatingDays {
  [key: string]: boolean;
}

export interface Todo {
  id: string;
  color: string;
  description: string;
  dueDate: Timestamp | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  isArchived: boolean;
  isFavorite: boolean;
  repeatingDays: RepeatingDays;
}
