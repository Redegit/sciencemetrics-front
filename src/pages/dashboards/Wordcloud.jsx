import { useEffect, useState } from "react";
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import EchartsWordCloud from "../../components/EchartsWordCloud";
import { request } from "../../api/request";

export const WORDCLOUD = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [wordData, setWordData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Сначала загружаем года
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await request.get("statistics/years");
        if (Array.isArray(response.data)) {
          const sortedYears = response.data.sort((a, b) => b - a); // новые года первыми
          setYears(sortedYears);

          if (!selectedYear && sortedYears.length > 0) {
            setSelectedYear(sortedYears[0].toString()); // Ставим выбранный ГОД после загрузки
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки годов:", error);
      }
    };

    fetchYears();
  }, []);

  // 2. Потом подгружаем слова при изменении года
  useEffect(() => {
    if (!selectedYear) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await request.get(`/statistics/keywords?year=${selectedYear}`);
        const transformedData = response.data
            .slice(0, 20)
            .map(({ keyword, count }) => ({
              name: keyword,
              value: count,
            }));

        setWordData(transformedData);
      } catch (error) {
        console.error("Ошибка загрузки ключевых слов:", error);
        setWordData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const clearYearFilter = () => {
    setSelectedYear("");
  };

  return (
      <>
        <div className="filters">
          <div className="year-filter">
            <label htmlFor="year-select">Фильтр по году:</label>
            <div className="select-wrapper">
              <select
                  id="year-select"
                  value={selectedYear}
                  onChange={handleYearChange}
                  disabled={!years.length}
              >
                <option value="">Все года</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                ))}
              </select>
              {selectedYear && (
                  <button
                      onClick={clearYearFilter}
                      className="clear-filter-btn"
                      title="Очистить фильтр"
                  >
                    &times;
                  </button>
              )}
            </div>
          </div>
        </div>

        <DashboardLayoutContainer>
          {loading ? (
              <div className="loading">Загрузка данных...</div>
          ) : (
              <EchartsWordCloud
                  data={wordData}
                  year={selectedYear ? Number(selectedYear) : undefined}
              />
          )}
        </DashboardLayoutContainer>
      </>
  );
};
