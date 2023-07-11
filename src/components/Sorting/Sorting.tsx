"use client";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import styles from "./Sorting.module.scss";
import { setSortType } from "@/slices/appSlice";

const Sorting: React.FC = () => {
  const dispatch = useAppDispatch();

  const sortType = useAppSelector((state) => state.app.sortType);

  const handleSetSortType = (type: string) => {
    dispatch(setSortType(type));
  };

  return (
    <ul className={styles.sortList}>
      <li className={styles.sortItem}>
        <button
          className={classNames(styles.sortButton, {
            [styles.active]: sortType === "default",
          })}
          onClick={() => handleSetSortType("default")}
        >
          SORT BY DEFAULT
        </button>
      </li>
      <li className={styles.sortItem}>
        <button
          className={classNames(styles.sortButton, {
            [styles.active]: sortType === "up",
          })}
          onClick={() => handleSetSortType("up")}
        >
          SORT BY DATE up
        </button>
      </li>
      <li className={styles.sortItem}>
        <button
          className={classNames(styles.sortButton, {
            [styles.active]: sortType === "down",
          })}
          onClick={() => handleSetSortType("down")}
        >
          SORT BY DATE down
        </button>
      </li>
    </ul>
  );
};

export default Sorting;
