import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const PieChart = ({labels,series}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    var options = {
      chart: {
        height: 350,
        type: 'pie',
        stacked: false,
      },
      colors: ['#FF1654', '#247BA0'],
      series: series,
      labels: labels,
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new ApexCharts(document.querySelector('#pie_chart'), options);
    chartRef.current.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="m-2 lg:col-span-1 shadow-md">
      <h2 className="text-xl p-2">Pie Chart</h2>
      <div id="pie_chart" className="w-full"></div>
    </div>
  );
};

export default PieChart;
