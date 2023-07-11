"use client";
import { resetTodo, toggleTodoFormOpen } from "@/slices/appSlice";
import { useAppDispatch } from "@/hooks";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleTodoFormOpen = () => {
    dispatch(resetTodo());
    dispatch(toggleTodoFormOpen(true));
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>TODO APP</h1>
      <button className={styles.addTodoButton} onClick={handleTodoFormOpen}>
        + ADD NEW TODO
      </button>
    </header>
  );
};

export default Header;
