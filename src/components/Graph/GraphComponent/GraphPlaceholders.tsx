export const GraphPlaceholders = {
  FiltersEmpty: () => (
    <div className="error">
      <p>Пожалуйста, примените хотя бы один фильтр</p>
    </div>
  ),
  Error: ({ error }: { error: string }) => (
    <div className="error">
      <p>{error}</p>
    </div>
  ),
  Loading: () => <div className="loading">Загрузка данных...</div>,
};
