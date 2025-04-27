import { ErrorMessage } from "../Graph";
import styles from "./GraphComponent.module.css";

export const Placeholders = {
  FiltersEmpty: () => (
    <div className={styles.error}>
      <p>Пожалуйста, примените хотя бы один фильтр</p>
    </div>
  ),

  Error: ({ error }: { error: ErrorMessage }) => (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  ),
  Loading: () => <div className={styles.loading}>Загрузка данных...</div>,
};
