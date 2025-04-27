import { useEffect, useState } from "react";
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import EchartsWordCloud from "../../components/EchartsWordCloud";
import { request } from "../../api/request";

export const WORDCLOUD = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [wordData, setWordData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await request.get("statistics/years");
        const yearsArray = response?.data?.items || response?.items || [];

        if (Array.isArray(yearsArray)) {
          const sortedYears = yearsArray.sort((a, b) => b - a);
          setYears(sortedYears);

          if (!selectedYear && sortedYears.length > 0) {
            setSelectedYear(sortedYears[0].toString());
          }
        } else {
          console.error("Ошибка: Неверный формат ответа по годам", response);
        }
      } catch (error) {
        console.error("Ошибка при загрузке годов:", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      if (!selectedYear) return;
      try {
        setLoading(true);
        const response = await request.get(`/statistics/keywords?year=${selectedYear}`);
        const wordsArray = response?.data || response || [];

        const transformedData = (Array.isArray(wordsArray) ? wordsArray : [])
            .slice(0, 50)
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

    fetchWords();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const clearYearFilter = () => {
    if (years.length > 0) {
      setSelectedYear(years[0].toString()); // Сбрасываем на первый (самый новый) год
    }
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
                {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                ))}
              </select>
              {years.length > 0 && (
                  <button
                      onClick={clearYearFilter}
                      className="clear-filter-btn"
                      title="Сбросить фильтр на текущий год"
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
