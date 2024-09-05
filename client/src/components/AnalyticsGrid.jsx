import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

function AnalyticsGrid({ shortID }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/analytics/getAnalytics?shortID=${shortID}`, { withCredentials: true });
        setData(res.data.data.analytics);
      } catch (e) {
        console.log("Error fetching analytics data: ", e);
      }
    }
    fetchAnalyticsData();
  }, [shortID]);

  if (!data) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const { totalClicks, devices, browsers, OS, dailyClicks } = data;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Analytics Data',
      },
    },
  };

  const dailyClicksData = {
    labels: dailyClicks.map(click => new Date(click.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Daily Clicks',
        data: dailyClicks.map(click => click.clicks),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const deviceData = {
    labels: [...new Set(devices)],
    datasets: [
      {
        label: 'Devices',
        data: [...new Set(devices)].map(device => devices.filter(d => d === device).length),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const browserData = {
    labels: [...new Set(browsers)],
    datasets: [
      {
        label: 'Browsers',
        data: [...new Set(browsers)].map(browser => browsers.filter(b => b === browser).length),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const osData = {
    labels: [...new Set(OS)],
    datasets: [
      {
        label: 'Operating Systems',
        data: [...new Set(OS)].map(os => OS.filter(o => o === os).length),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-6xl mx-auto h-max">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Analytics for Short Link</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Clicks</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalClicks}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg h-64">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Daily Clicks</h3>
          <Line data={dailyClicksData} options={chartOptions} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg h-64">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Devices</h3>
          <Bar data={deviceData} options={chartOptions} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg h-64">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Browsers</h3>
          <Bar data={browserData} options={chartOptions} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg h-64">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Operating Systems</h3>
          <Bar data={osData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsGrid;
