import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

interface PieChartProps {
    data: number[];
    labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    let myPieChart: Chart<'pie', number[], string> | null = null;

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: [
                                '#861e27ff',
                                '#df9d6380',
                                '#72442599',
                            ],
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                        },
                        layout: {
                            padding: {
                                top: 10,
                                bottom: 10,
                                left: 10,
                                right: 10,
                            },
                        },
                    },
                });
            }
        }

        return () => {
            if (myPieChart) {
                myPieChart.destroy();
            }
        };
    }, [data, labels]);

    return <canvas ref={chartRef} style={{ maxWidth: '400px'}} />;
};

export default PieChart;
