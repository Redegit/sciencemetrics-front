import { useEffect, useState } from 'react';
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";
import  EchartsWordCloud  from "../../components/EchartsWordCloud";
import YearFilter from '../../components/YearFilter';
import { request } from '../../api/request';

export const WORDCLOUD = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [wordData, setWordData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await request.get(`statistics/keywords?year=${selectedYear}`);
        
        // Transform API data to required format and take first 20 items
        const transformedData = data
          .slice(0, 20)
          .map(({ keyword, count }) => ({ name: keyword, value: count }));
        
        setWordData(transformedData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  return (
    <>
      <div className="filters">
        <YearFilter 
          selectedYear={selectedYear} 
          onYearChange={setSelectedYear} 
        />
      </div>
      
      <DashboardLayoutContainer>
        {loading ? (
          <div className="loading">Загрузка данных...</div>
        ) : (
          <EchartsWordCloud data={wordData} year={selectedYear} />
        )}
      </DashboardLayoutContainer>
    </>
  );
};