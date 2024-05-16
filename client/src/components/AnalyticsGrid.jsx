import {useEffect,useState} from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);
function AnalyticsGrid({shortID}){
  
  const [data, setdata] = useState(null);
  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/analytics/getAnalytics?shortID=${shortID}`, { withCredentials: true });
        setdata(res.data.data.analytics);
      } catch (e) {
        console.log("Error fetching analytics data: ", e);
      }
    }
    fetchAnalyticsData();
  },[]);
  if (!data) {
    return <p>Loading...</p>;
  }

  const { totalClicks, devices, browsers, OS, dailyClicks } = data;

  const dailyClicksData = {
    labels: dailyClicks.map(click => new Date(click.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Daily Clicks',
        data: dailyClicks.map(click => click.clicks),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const osData = {
    labels: [...new Set(OS)],
    datasets: [
      {
        label: 'OS',
        data: [...new Set(OS)].map(os => OS.filter(o => o === os).length),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const devicesData = {
    labels: [...new Set(devices)],
    datasets: [
      {
        label: 'Devices',
        data: [...new Set(devices)].map(device => devices.filter(d => d === device).length),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const browsersData = {
    labels: [...new Set(browsers)],
    datasets: [
      {
        label: 'Browsers',
        data: [...new Set(browsers)].map(browser => browsers.filter(b => b === browser).length),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };
  
  
  
    return (
    <div className="flex flex-wrap justify-start bg-[#ffffffbb] text-center rounded-lg p-8 w-[50dvw] ml-[1rem] mr-[1rem] flex-grow h-[80dvh] mt-[14dvh] overflow-y-scroll">
      <div className="w-full mb-4">
        <div className="flex justify-center items-center bg-white shadow-md p-4 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500">Total Clicks</p>
            <p className="text-3xl text-blue-600">{data?data.totalClicks:null}</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white shadow-md p-4 rounded-lg h-48 flex justify-center items-center">
        {data?<Line data={dailyClicksData} />:null}
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white shadow-md p-4 rounded-lg h-48 flex justify-center items-center">
        <Bar data={osData} />
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white shadow-md p-4 rounded-lg h-48 flex justify-center items-center">
        <Bar data={devicesData} />
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white shadow-md p-4 rounded-lg h-48 flex justify-center items-center">
        <Bar data={browsersData} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsGrid;
