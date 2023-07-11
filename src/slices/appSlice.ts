import { DEFAULT_TODO } from "@/constants";
import { Todo } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AppState {
  todoFormOpen: boolean;
  todo: Todo;
  filterType: string;
  sortType: string;
}

const initialState: AppState = {
  todoFormOpen: false,
  todo: DEFAULT_TODO,
  filterType: "all",
  sortType: "default",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFilterType: (state, { payload: type }: PayloadAction<string>) => {
      state.filterType = type;
    },
    setSortType: (state, { payload: type }: PayloadAction<string>) => {
      state.sortType = type;
    },
    toggleTodoFormOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.todoFormOpen = isOpen;
    },
    setTodo: (state, { payload: todo }: PayloadAction<Todo>) => {
      state.todo = todo;
    },
    resetTodo: (state) => {
      state.todo = DEFAULT_TODO;
    },
  },
});

export const { setFilterType, setSortType, toggleTodoFormOpen, setTodo, resetTodo } =
  appSlice.actions;

export default appSlice.reducer;
