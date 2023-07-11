import classNames from "classnames";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setTodo, toggleTodoFormOpen } from "@/slices/appSlice";
import { setFormatTodoDueDate, isTodoRepeating, isTodoExpired } from "@/utils";
import {
  useToggleTodoArchiveMutation,
  useToggleTodoFavoriteMutation,
} from "@/services/todoApi";
import { Todo } from "@/types";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const todoFormOpen = useAppSelector((state) => state.app.todoFormOpen);

  const [toggleTodoArchiveMutation, { isLoading: isTodoArchiveToggling }] =
    useToggleTodoArchiveMutation();

  const [toggleTodoFavoriteMutation, { isLoading: isTodoFavoriteToggling }] =
    useToggleTodoFavoriteMutation();

  const todoExpired = isTodoExpired(todo.dueDate);

  const handleSetTodo = () => {
    dispatch(setTodo(todo));
    if (!todoFormOpen) {
      dispatch(toggleTodoFormOpen(true));
    }
  };

  const handleToggleTodoArchiveMutation = async () => {
    try {
      await toggleTodoArchiveMutation({ todoId: todo.id, isArchived: todo.isArchived });
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleToggleTodoFavoriteMutation = async () => {
    try {
      await toggleTodoFavoriteMutation({ todoId: todo.id, isFavorite: todo.isFavorite });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className={classNames(styles.todo, {
        [styles.expired]: todoExpired,
      })}
    >
      <div className={styles.controlButtons}>
        <button className={styles.controlButton} onClick={handleSetTodo}>
          EDIT
        </button>
        <button
          className={classNames(styles.controlButton, {
            [styles.active]: todo.isArchived,
          })}
          disabled={isTodoArchiveToggling}
          onClick={handleToggleTodoArchiveMutation}
        >
          ARCHIVE
        </button>
        <button
          className={classNames(styles.controlButton, {
            [styles.active]: todo.isFavorite,
          })}
          disabled={isTodoFavoriteToggling}
          onClick={handleToggleTodoFavoriteMutation}
        >
          FAVORITES
        </button>
      </div>
      {isTodoRepeating(todo.repeatingDays) ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="159"
          height="10"
          viewBox="0 0 159 10"
        >
          <g
            fill="none"
            fillRule="nonzero"
            stroke={todo.color}
            strokeLinecap="square"
            strokeWidth="5"
          >
            <path d="M4 4l9.257 2.463L21.367 4l7.927 2.463L38.736 4l9.117 2.463L56.103 4l8.685 2.463L73.472 4l8.684 2.463L90.84 4l8.684 2.463L108.208 4l8.684 2.463L125.576 4l8.684 2.463L142.943 4M146.423 4l9.257 2.463" />
          </g>
        </svg>
      ) : (
        <span
          className={classNames(styles.line, styles[todo.color], {
            [styles["red"]]: todoExpired,
          })}
        />
      )}
      <p className={styles.description}>{todo.description}</p>
      {todo.dueDate && (
        <span
          className={classNames(styles.date, {
            [styles.dateExpired]: todoExpired,
          })}
        >
          {setFormatTodoDueDate(todo.dueDate)}
        </span>
      )}
    </div>
  );
};

export default TodoItem;
