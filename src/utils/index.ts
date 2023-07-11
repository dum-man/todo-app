import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import { RepeatingDays, Todo } from "@/types";

type DueDate = Timestamp | null;

interface SortType {
  dueDate: DueDate;
}

export const isTodoExpired = (dueDate: DueDate) =>
  dueDate && dayjs().isAfter(dueDate.toDate(), "D");

export const isTodoExpiringToday = (dueDate: DueDate) =>
  dueDate && dayjs(dueDate.toDate()).isSame(dayjs(), "D");

export const isTodoActiveToday = (repeatingDays: RepeatingDays) =>
  Object.entries(repeatingDays).filter(
    (day) => day[1] && day[0] === dayjs().format("dd").toLowerCase()
  );

export const isTodoRepeating = (repeatingDays: RepeatingDays) =>
  Object.values(repeatingDays).some(Boolean);

export const setFormatTodoDueDate = (dueDate: Timestamp) =>
  dayjs(dueDate.toDate()).format("D MMMM");

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).format("YYYY-MM-DD");
};

export const setFormattedDate = (date: Date | string | undefined) => {
  if (!date) {
    return null;
  }
  return Timestamp.fromDate(new Date(date));
};

const getWeightForNullDate = (dateA: DueDate, dateB: DueDate) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTodoUp = (todoA: SortType, todoB: SortType) => {
  const weight = getWeightForNullDate(todoA.dueDate, todoB.dueDate);

  return weight ?? dayjs(todoA.dueDate?.toDate()).diff(dayjs(todoB.dueDate?.toDate()));
};

export const sortTodoDown = (todoA: SortType, todoB: SortType) => {
  const weight = getWeightForNullDate(todoA.dueDate, todoB.dueDate);

  return weight ?? dayjs(todoB.dueDate?.toDate()).diff(dayjs(todoA.dueDate?.toDate()));
};

export const getAllTodosNum = (todos: Todo[]) =>
  todos.filter((todo) => todo && !todo.isArchived).length;

export const getExpiredTodosNum = (todos: Todo[]) =>
  todos.filter((todo) => isTodoExpired(todo.dueDate) && !todo.isArchived).length;

export const getTodayTodosNum = (todos: Todo[]) =>
  todos.filter(
    (todo) =>
      (isTodoExpiringToday(todo.dueDate) ||
        isTodoActiveToday(todo.repeatingDays).length) &&
      !todo.isArchived
  ).length;

export const getFavoriteTodosNum = (todos: Todo[]) =>
  todos.filter((todo) => todo.isFavorite && !todo.isArchived).length;

export const getRepeatingTodosNum = (todos: Todo[]) =>
  todos.filter((todo) => isTodoRepeating(todo.repeatingDays) && !todo.isArchived).length;

export const getArchivedTodosNum = (todos: Todo[]) =>
  todos.filter((todo) => todo.isArchived).length;

const getSortedTodos = (todos: Todo[], sortType: string) => {
  if (todos) {
    switch (sortType) {
      case "up":
        return [...todos].sort(sortTodoUp);
      case "down":
        return [...todos].sort(sortTodoDown);
      default:
        return todos;
    }
  }
  return todos;
};

const getFilteredTodos = (todos: Todo[], todoType: string) => {
  switch (todoType) {
    case "all":
      return [...todos].filter((todo) => todo && !todo.isArchived);
    case "overdue":
      return [...todos].filter((todo) => isTodoExpired(todo.dueDate) && !todo.isArchived);
    case "today":
      return [...todos].filter(
        (todo) =>
          (isTodoExpiringToday(todo.dueDate) ||
            isTodoActiveToday(todo.repeatingDays).length) &&
          !todo.isArchived
      );
    case "favorites":
      return [...todos].filter((todo) => todo.isFavorite && !todo.isArchived);
    case "repeating":
      return [...todos].filter(
        (todo) => isTodoRepeating(todo.repeatingDays) && !todo.isArchived
      );
    case "archive":
      return [...todos].filter((todo) => todo.isArchived);
    default:
      return todos;
  }
};

const getFilteredAndSortedTodos = (todos: Todo[], todoType: string, sortType: string) => {
  const sortedTodos = getSortedTodos(todos, sortType);

  return getFilteredTodos(sortedTodos, todoType);
};

export default getFilteredAndSortedTodos;
