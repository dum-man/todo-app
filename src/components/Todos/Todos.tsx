"use client";
import { useAppSelector } from "@/hooks";
import { useGetTodosQuery } from "@/services/todoApi";
import getFilteredAndSortedTodos from "@/utils";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./Todos.module.scss";

const Todos: React.FC = () => {
  const todoFormOpen = useAppSelector((state) => state.app.todoFormOpen);

  const { data: todos = [], isLoading } = useGetTodosQuery();

  const { filterType, sortType } = useAppSelector((state) => state.app);

  const filteredAndSortedTodos = getFilteredAndSortedTodos(todos, filterType, sortType);

  if (isLoading) {
    return <p className={styles.loading}>LOADING...</p>;
  }

  return (
    <main>
      <section className={styles.container}>
        <ul className={styles.todoList}>
          {todoFormOpen && <TodoForm />}
          {filteredAndSortedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Todos;
