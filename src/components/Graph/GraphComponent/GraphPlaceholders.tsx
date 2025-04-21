import styles from "./GraphLayout.module.css";

export const GraphPlaceholders = {
  FiltersEmpty: () => (
    <div className={styles.error}>
      <p>Пожалуйста, примените хотя бы один фильтр</p>
    </div>
  ),
  Error: ({ error }: { error: string }) => (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  ),
  Loading: () => <div className={styles.loading}>Загрузка данных...</div>,
};
