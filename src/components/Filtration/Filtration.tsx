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

  const allTodosNum = getAllTodosNum(todos);
  const expiredTodosNum = getExpiredTodosNum(todos);
  const todayTodosNum = getTodayTodosNum(todos);
  const favoriteTodosNum = getFavoriteTodosNum(todos);
  const repeatingTodosNum = getRepeatingTodosNum(todos);
  const archivedTodosNum = getArchivedTodosNum(todos);

  return (
    <ul className={styles.filterList}>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "all",
          })}
          disabled={allTodosNum === 0}
          onClick={() => handleSetFilterType("all")}
        >
          ALL {allTodosNum}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "overdue",
          })}
          disabled={expiredTodosNum === 0}
          onClick={() => handleSetFilterType("overdue")}
        >
          OVERDUE {expiredTodosNum}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "today",
          })}
          disabled={todayTodosNum === 0}
          onClick={() => handleSetFilterType("today")}
        >
          TODAY {todayTodosNum}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "favorites",
          })}
          disabled={favoriteTodosNum === 0}
          onClick={() => handleSetFilterType("favorites")}
        >
          FAVORITES {favoriteTodosNum}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "repeating",
          })}
          disabled={repeatingTodosNum === 0}
          onClick={() => handleSetFilterType("repeating")}
        >
          REPEATING {repeatingTodosNum}
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.filterButton, {
            [styles.active]: filterType === "archive",
          })}
          disabled={archivedTodosNum === 0}
          onClick={() => handleSetFilterType("archive")}
        >
          ARCHIVE {archivedTodosNum}
        </button>
      </li>
    </ul>
  );
};

export default Filtration;
