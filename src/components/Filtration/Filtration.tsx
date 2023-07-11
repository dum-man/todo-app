"use client";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useGetTodosQuery } from "@/services/todoApi";
import { setFilterType } from "@/slices/appSlice";
import {
  getAllTodosNum,
  getArchivedTodosNum,
  getExpiredTodosNum,
  getFavoriteTodosNum,
  getRepeatingTodosNum,
  getTodayTodosNum,
} from "@/utils";
import styles from "./Filtration.module.scss";

const Filtration: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: todos = [] } = useGetTodosQuery();

  const filterType = useAppSelector((state) => state.app.filterType);

  const handleSetFilterType = (type: string) => {
    dispatch(setFilterType(type));
  };

  return (
    <ul className={styles.filterList}>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "all",
          })}
          onClick={() => handleSetFilterType("all")}
        >
          ALL {getAllTodosNum(todos)}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "overdue",
          })}
          onClick={() => handleSetFilterType("overdue")}
        >
          OVERDUE {getExpiredTodosNum(todos)}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "today",
          })}
          onClick={() => handleSetFilterType("today")}
        >
          TODAY {getTodayTodosNum(todos)}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "favorites",
          })}
          onClick={() => handleSetFilterType("favorites")}
        >
          FAVORITES {getFavoriteTodosNum(todos)}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "repeating",
          })}
          onClick={() => handleSetFilterType("repeating")}
        >
          REPEATING {getRepeatingTodosNum(todos)}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "archive",
          })}
          onClick={() => handleSetFilterType("archive")}
        >
          ARCHIVE {getArchivedTodosNum(todos)}
        </button>
      </li>
    </ul>
  );
};

export default Filtration;
