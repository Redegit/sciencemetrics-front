import React from 'react';

const YearFilter = ({ selectedYear, onYearChange }) => {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];

  return (
    <div className="year-filter">
      <label htmlFor="year-select">Выберите год: </label>
      <select 
        id="year-select"
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="filter-select"
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default YearFilter;