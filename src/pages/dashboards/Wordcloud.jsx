import { useEffect, useState } from "react";
import EchartsWordCloud from "../../components/EchartsWordCloud/EchartsWordCloud";
import { request } from "../../api/request";
import { CrossSvg } from "../../components/CrossSvg";
import { Dashboard } from "../../hoc/Dashboard";
import { Placeholder } from "../../components/Placeholder/Placeholder";

export const WORDCLOUD = () => {
  const [years, setYears] = useState([]);
  const [error, setError] = useState(null)
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
          setError(null);
        } else {
          console.error("Ошибка: Неверный формат ответа по годам", response);
          setError(`Ошибка: Неверный формат ответа по годам: ${response}`);
        }
      } catch (error) {
        console.error("Ошибка при загрузке годов:", error);
        setError(`Ошибка при загрузке годов: ${error}`);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      if (!selectedYear) return;
      try {
        setLoading(true);
        const response = await request.get(
          `/statistics/keywords?year=${selectedYear}`
        );
        const wordsArray = response?.data || response || [];

        const transformedData = (Array.isArray(wordsArray) ? wordsArray : [])
          .slice(0, 50)
          .map(({ keyword, count }) => ({
            name: keyword,
            value: count,
          }));

        setWordData(transformedData);
        setError(null);
      } catch (error) {
        console.error("Ошибка загрузки ключевых слов:", error);
        setWordData([]);
        setError(`Ошибка загрузки ключевых слов: ${error}`);
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
    <Dashboard.Body>
      <Dashboard.Filters>
        <div className="select-filter">
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
                <CrossSvg />
              </button>
            )}
          </div>
        </div>
      </Dashboard.Filters>

      <Dashboard.Layout
        title={`Популярные ключевые слова за ${selectedYear} год`}
      >
        {loading ? (
          <Placeholder status="loading" fullheight />
        ) : error ? (
          <Placeholder status="error" errorMessage={error} fullheight />
        ) : (
          <EchartsWordCloud
            data={wordData}
            year={selectedYear ? Number(selectedYear) : undefined}
          />
        )}
      </Dashboard.Layout>
    </Dashboard.Body>
  );
};
