import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import * as echarts from 'echarts';
import { DashboardLayoutContainer } from "../../hoc/DashboardLayoutContainer";

const BarChart = ({ data, title, xAxisName, yAxisName, color }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);
        
        if (!data || data.length === 0) {
            chart.setOption({
                xAxis: { show: false },
                yAxis: { show: false },
                series: []
            });
            return;
        }

        const option = {
            title: { 
                text: title, 
                left: 'center',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: '{b}: {c}'
            },
            xAxis: {
                type: 'category',
                data: data.map(item => item[0]),
                axisLabel: { 
                    rotate: 45,
                    interval: 0,
                    fontSize: 12,
                    margin: 15,
                    formatter: (value) => {
                        const maxLength = 25;
                        if (value.length > maxLength) {
                            const parts = [];
                            for (let i = 0; i < value.length; i += maxLength) {
                                parts.push(value.substring(i, i + maxLength));
                            }
                            return parts.join('\n');
                        }
                        return value;
                    }
                },
                axisTick: {
                    alignWithLabel: true
                }
            },
            yAxis: { 
                type: 'value', 
                name: yAxisName,
                nameTextStyle: {
                    padding: [0, 0, 0, 40]
                }
            },
            series: [{
                name: 'Упоминания',
                type: 'bar',
                data: data.map(item => item[1]),
                itemStyle: { 
                    color: color,
                    borderRadius: [4, 4, 0, 0]
                },
                barWidth: '40%',
                label: { 
                    show: true, 
                    position: 'top',
                    fontSize: 10
                }
            }],
            grid: {
                left: '10%',
                right: '5%',
                bottom: '25%',
                top: '15%',
                containLabel: true
            }
        };

        chart.setOption(option);

        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.dispose();
        };
    }, [data, title, xAxisName, yAxisName, color]);

    return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

const Filters = ({ 
    organizations, 
    keywords, 
    selectedOrganization, 
    selectedKeyword,
    onOrganizationChange,
    onKeywordChange
}) => (
    <div className="filters">
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Ключевое слово</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedKeyword}
                    onChange={onKeywordChange}
                >
                    {keywords.map((kw, index) => (
                        <option key={index} value={kw}>{kw}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Организация</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedOrganization}
                    onChange={onOrganizationChange}
                >
                    {organizations.map((org, index) => (
                        <option key={index} value={org}>{org}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        </Form>
    </div>
);

export const RATING = () => {
    const [organizations, setOrganizations] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedKeyword, setSelectedKeyword] = useState('');
    const [topOrganizations, setTopOrganizations] = useState([]);
    const [topKeywords, setTopKeywords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [orgsResponse, keywordsResponse] = await Promise.all([
                    fetch('http://127.0.0.1:5001/api/statistics/rating/organizations'),
                    fetch('http://127.0.0.1:5001/api/statistics/rating/keywords')
                ]);

                const [orgsData, keywordsData] = await Promise.all([
                    orgsResponse.json(),
                    keywordsResponse.json()
                ]);

                setOrganizations(orgsData);
                setKeywords(keywordsData);
                
                if (orgsData.length > 0) setSelectedOrganization(orgsData[0]);
                if (keywordsData.length > 0) setSelectedKeyword(keywordsData[0]);
                
                setLoading(false);
            } catch (error) {
                console.error('Error loading initial data:', error);
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchTopData = async () => {
            if (!selectedKeyword || !selectedOrganization) return;

            try {
                const [orgsResponse, keywordsResponse] = await Promise.all([
                    fetch(`http://127.0.0.1:5001/api/statistics/rating/organizations-by-keyword?keyword=${encodeURIComponent(selectedKeyword)}`),
                    fetch(`http://127.0.0.1:5001/api/statistics/rating/keywords-by-organization?organization=${encodeURIComponent(selectedOrganization)}`)
                ]);

                const [orgsData, keywordsData] = await Promise.all([
                    orgsResponse.json(),
                    keywordsResponse.json()
                ]);

                setTopOrganizations(orgsData);
                setTopKeywords(keywordsData);
            } catch (error) {
                console.error('Error loading top data:', error);
            }
        };

        fetchTopData();
    }, [selectedKeyword, selectedOrganization]);

    const handleOrganizationChange = (e) => {
        setSelectedOrganization(e.target.value);
    };

    const handleKeywordChange = (e) => {
        setSelectedKeyword(e.target.value);
    };

    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    return (
        <>
            <Filters
                organizations={organizations}
                keywords={keywords}
                selectedOrganization={selectedOrganization}
                selectedKeyword={selectedKeyword}
                onOrganizationChange={handleOrganizationChange}
                onKeywordChange={handleKeywordChange}
            />

            <DashboardLayoutContainer>
                <div className="charts-container">
                    <div className="chart-wrapper">
                        <div className="chart-card">
                            <BarChart 
                                data={topOrganizations}
                                title={`Топ-10 организаций по ключевому слову: ${selectedKeyword}`}
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
                                title={`Топ-10 ключевых слов для: ${selectedOrganization}`}
                                xAxisName="Ключевые слова"
                                yAxisName="Упоминания"
                                color="#42bbc6"
                            />
                        </div>
                    </div>
                </div>
            </DashboardLayoutContainer>

            <style jsx="true">{`
                .filters {
                    padding: 20px;
                    background: #f8f9fa;
                    margin-bottom: 20px;
                }
                .charts-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    gap: 20px;
                    width: 100%;
                }
                .chart-wrapper {
                    flex: 0 0 48%;
                    min-width: 0;
                    box-sizing: border-box;
                }
                .chart-card {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    height: 100%;
                    width: 100%;
                }
                @media (max-width: 1400px) {
                    .chart-wrapper {
                        flex: 1 1 100%;
                    }
                }
            `}</style>
        </>
    );
};