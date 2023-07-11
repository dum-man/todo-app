import { useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
import classNames from "classnames";
import { toast } from "react-hot-toast";
import { Timestamp } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { resetTodo, toggleTodoFormOpen } from "@/slices/appSlice";
import { useCreateTodoMutation, useDeleteTodoMutation } from "@/services/todoApi";
import { formatDate, isTodoRepeating, setFormattedDate } from "@/utils";
import { COLORS, REPEATING_DAYS } from "@/constants";
import styles from "./TodoForm.module.scss";

const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const todo = useAppSelector((state) => state.app.todo);

  const [createTodo, { isLoading: isTodoCreating }] = useCreateTodoMutation();
  const [deleteTodo, { isLoading: isTodoDeleting }] = useDeleteTodoMutation();

  const [description, setDescription] = useState(todo.description);

  const [dateSelected, setDateSelected] = useState(!!todo.dueDate);
  const [dueDate, setDueDate] = useState<string | undefined>(() =>
    formatDate(todo.dueDate?.toDate())
  );

  const [repeatingDaysSelected, setRepeatingDaysSelected] = useState(() =>
    isTodoRepeating(todo.repeatingDays)
  );
  const [repeatingDays, setRepeatingDays] = useState(todo.repeatingDays);

  const [selectedColor, setSelectedColor] = useState(todo.color);

  const handleSetDateSelected = () => {
    setRepeatingDaysSelected(false);
    setRepeatingDays(REPEATING_DAYS);
    setDateSelected((prev) => !prev);
  };

  const handleSetRepeatingDaysSelected = () => {
    setDateSelected(false);
    setDueDate(undefined);
    setRepeatingDaysSelected((prev) => !prev);
  };

  const handleSetRepeatingDays = (day: string) => {
    setRepeatingDays((prev) => {
      return {
        ...prev,
        [day]: !prev[day],
      };
    });
  };

  const handleFormClose = () => {
    dispatch(toggleTodoFormOpen(false));
    dispatch(resetTodo());
  };

  const handleSubmitTodo = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!description.trim()) {
      toast.error("Description must be specified");
      return;
    }
    try {
      await createTodo({
        todo: {
          id: todo.id || uuidv4(),
          color: selectedColor,
          description: description.trim(),
          isArchived: false,
          isFavorite: false,
          repeatingDays,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          dueDate: setFormattedDate(dueDate),
        },
      }).unwrap();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    handleFormClose();
  };

  const handleDeleteTodo = async () => {
    if (todo.id) {
      try {
        await deleteTodo({ todoId: todo.id });
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
    handleFormClose();
  };

  useEffect(() => {
    setDescription(todo.description);
    setSelectedColor(todo.color);
    setDueDate(formatDate(todo.dueDate?.toDate()));
    setRepeatingDays(todo.repeatingDays);
    setDateSelected(!!todo.dueDate);
    setRepeatingDaysSelected(isTodoRepeating(todo.repeatingDays));
  }, [todo]);

  return (
    <div className={styles.container}>
      {isTodoRepeating(repeatingDays) ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="159"
          height="10"
          viewBox="0 0 159 10"
        >
          <g
            fill="none"
            fillRule="nonzero"
            stroke={selectedColor}
            strokeLinecap="square"
            strokeWidth="5"
          >
            <path d="M4 4l9.257 2.463L21.367 4l7.927 2.463L38.736 4l9.117 2.463L56.103 4l8.685 2.463L73.472 4l8.684 2.463L90.84 4l8.684 2.463L108.208 4l8.684 2.463L125.576 4l8.684 2.463L142.943 4M146.423 4l9.257 2.463" />
          </g>
        </svg>
      ) : (
        <span className={classNames(styles.line, styles[selectedColor])} />
      )}
      <form className={styles.form} onSubmit={handleSubmitTodo}>
        <textarea
          className={styles.todoDescription}
          placeholder="Start typing your text here..."
          maxLength={150}
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <div className={styles.dateWrapper}>
          <button
            className={styles.dateButton}
            type="button"
            onClick={handleSetDateSelected}
          >
            DATE: {dateSelected ? "YES" : "NO"}
          </button>
          {dateSelected && (
            <input
              type="date"
              value={dueDate}
              onChange={(evt) => setDueDate(evt.target.value)}
            />
          )}
        </div>
        <div className={styles.dateWrapper}>
          <button
            className={styles.dateButton}
            type="button"
            onClick={handleSetRepeatingDaysSelected}
          >
            REPEAT: {repeatingDaysSelected ? "YES" : "NO"}
          </button>
          {repeatingDaysSelected && (
            <ul className={styles.repeatingDays}>
              {Object.keys(REPEATING_DAYS).map((key) => (
                <li key={key}>
                  <button
                    className={classNames(styles.dayButton, {
                      [styles.daySelected]: repeatingDays[key],
                    })}
                    type="button"
                    // handleSetRepeatingDays(day as keyof typeof REPEATING_DAYS)
                    onClick={() => handleSetRepeatingDays(key)}
                  >
                    {key}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.divider} />
        <span className={styles.colorTitle}>COLOR</span>
        <ul className={styles.colors}>
          {COLORS.map((color) => (
            <li
              key={color}
              className={styles.colorItem}
              style={{ borderColor: color === selectedColor ? color : "transparent" }}
            >
              <button
                className={classNames(styles.colorButton, styles[color])}
                type="button"
                onClick={() => setSelectedColor(color)}
              />
            </li>
          ))}
        </ul>
        <button
          className={classNames(styles.button, styles.saveButton)}
          type="submit"
          disabled={isTodoCreating}
        >
          {isTodoCreating ? "SAVING..." : "SAVE"}
        </button>
        <button
          className={classNames(styles.button, styles.deleteButton)}
          type="button"
          disabled={isTodoDeleting}
          onClick={handleDeleteTodo}
        >
          {isTodoDeleting ? "DELETING..." : "DELETE"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
