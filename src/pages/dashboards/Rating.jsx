import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import * as echarts from "echarts";
import { createUrl } from "../../api/request";
import { Dashboard } from "../../hoc/Dashboard";
import { Placeholder } from "../../components/Placeholder/Placeholder";

const BarChart = ({ data, title, xAxisName, yAxisName, color }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    if (!data || data.length === 0) {
      chart.setOption({
        xAxis: { show: false },
        yAxis: { show: false },
        series: [],
      });
      return;
    }

    const option = {
      title: {
        text: title,
        left: "center",
        textStyle: {
          fontSize: 14,
          fontWeight: "normal",
        },
      },
      tooltip: {
        extraCssText: "width:auto; white-space:pre-wrap;",
        confine: true,
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: "{b}: {c}",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item[0]),
        axisLabel: {
          rotate: 45,
          interval: 0,
          fontSize: 12,
          margin: 15,
          formatter: (value) => {
            const maxLength = 20;
            return value.length > maxLength
              ? value.slice(0, maxLength) + "..."
              : value;
          },
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
        name: yAxisName,
        nameTextStyle: {
          padding: [0, 0, 0, 40],
        },
      },
      series: [
        {
          name: "Упоминания",
          type: "bar",
          data: data.map((item) => item[1]),
          itemStyle: {
            color: color,
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: "40%",
          label: {
            show: true,
            position: "top",
            fontSize: 10,
          },
        },
      ],
      grid: {
        left: "10%",
        right: "5%",
        bottom: "25%",
        top: "15%",
        containLabel: true,
      },
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, title, xAxisName, yAxisName, color]);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

const Filters = ({
  organizations,
  keywords,
  selectedOrganization,
  selectedKeyword,
  onOrganizationChange,
  onKeywordChange,
}) => (
  <Dashboard.Filters>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Ключевое слово</Form.Label>
        <Form.Control
          as="select"
          value={selectedKeyword}
          onChange={onKeywordChange}
        >
          {keywords.map((kw, index) => (
            <option key={index} value={kw}>
              {kw}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Организация (где больше 200 публикаций)</Form.Label>
        <Form.Control
          as="select"
          value={selectedOrganization}
          onChange={onOrganizationChange}
        >
          {organizations.map((org, index) => (
            <option key={index} value={org.name}>
              {org.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  </Dashboard.Filters>
);

export const RATING = () => {
  const [organizations, setOrganizations] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [topOrganizations, setTopOrganizations] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopData = async (keyword, organizationId) => {
    if (!keyword || !organizationId) return;
    setLoading(true);

    try {
      const [orgsResponse, keywordsResponse] = await Promise.all([
        fetch(
          createUrl(
            `/statistics/rating/organizations-by-keyword?keyword=${encodeURIComponent(
              keyword
            )}`
          )
        ),
        fetch(
          createUrl(
            `/statistics/rating/keywords-by-organization?organizationid=${organizationId}`
          )
        ),
      ]);

      setLoading(false);

      if (!orgsResponse.ok || !keywordsResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const [orgsData, keywordsData] = await Promise.all([
        orgsResponse.json(),
        keywordsResponse.json(),
      ]);

      const prepareChartData = (data, nameKey = "name", countKey = "count") => {
        return data.map((item) => [item[nameKey], item[countKey]]);
      };

      setTopOrganizations(prepareChartData(orgsData, "name", "count"));
      setTopKeywords(prepareChartData(keywordsData, "keyword", "count"));
    } catch (error) {
      console.error("Error loading top data:", error);
      setError(`Error loading top data: ${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [orgsResponse, keywordsResponse] = await Promise.all([
          fetch(createUrl("/statistics/rating/organizations")),
          fetch(createUrl("/statistics/rating/keywords")),
        ]);

        if (!orgsResponse.ok || !keywordsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [orgsData, keywordsData] = await Promise.all([
          orgsResponse.json(),
          keywordsResponse.json(),
        ]);

        setOrganizations(orgsData);
        setKeywords(keywordsData);

        let defaultOrganization = orgsData.find((org) =>
          org.name.includes(
            "российский экономический университет им. г.в. плеханова"
          )
        );
        if (!defaultOrganization && orgsData.length > 0) {
          defaultOrganization = orgsData[0];
        }

        let defaultKeyword = keywordsData.find((kw) =>
          kw.includes("цифровизация")
        );
        if (!defaultKeyword && keywordsData.length > 0) {
          defaultKeyword = keywordsData[0];
        }

        if (defaultOrganization) {
          setSelectedOrganization(defaultOrganization.name);
          setSelectedOrganizationId(defaultOrganization.id.toString());
        }
        if (defaultKeyword) {
          setSelectedKeyword(defaultKeyword);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
        setError(`Error loading initial data: ${error}`);
        setLoading(false);
      }
    };

    setError(null);
    fetchInitialData();
  }, []);

  useEffect(() => {
    setError(null);
    fetchTopData(selectedKeyword, selectedOrganizationId);
  }, [selectedKeyword, selectedOrganizationId]);

  const handleOrganizationChange = (e) => {
    const selectedOrg = organizations.find(
      (org) => org.name === e.target.value
    );
    if (selectedOrg) {
      setSelectedOrganization(selectedOrg.name);
      setSelectedOrganizationId(selectedOrg.id.toString());
    }
  };

  const handleKeywordChange = (e) => {
    setSelectedKeyword(e.target.value);
  };

  return (
    <Dashboard.Body>
      <Filters
        organizations={organizations}
        keywords={keywords}
        selectedOrganization={selectedOrganization}
        selectedKeyword={selectedKeyword}
        onOrganizationChange={handleOrganizationChange}
        onKeywordChange={handleKeywordChange}
      />
      <Dashboard.Layout>
        {loading ? (
          <Placeholder status="loading" fullheight />
        ) : error ? (
          <Placeholder status="error" errorMessage={error} fullheight />
        ) : (
          <div className="charts-container">
            <div className="chart-wrapper">
              <div className="chart-card">
                <BarChart
                  data={topOrganizations}
                  title={`Топ-10 организаций по ключевому слову:\n ${selectedKeyword}`}
                  xAxisName="Организации"
                  yAxisName="Упоминания"
                  color="#42bbc6"
                />
              </div>
            </div>

            <div className="chart-wrapper">
              <div className="chart-card">
                <BarChart
                  data={topKeywords}
                  title={`Топ-10 ключевых слов для:\n ${selectedOrganization}`}
                  xAxisName="Ключевые слова"
                  yAxisName="Упоминания"
                  color="#42bbc6"
                />
              </div>
            </div>
          </div>
        )}
      </Dashboard.Layout>

      <style jsx>{`
        .charts-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
          width: 100%;
        }
        .chart-wrapper {
          padding: 1em;
          flex: 0 0 48%;
          min-width: 0;
          box-sizing: border-box;
        }
        .chart-card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          height: 100%;
          width: 100%;
        }

        @media (max-width: 1400px) {
          .chart-wrapper {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </Dashboard.Body>
  );
};
