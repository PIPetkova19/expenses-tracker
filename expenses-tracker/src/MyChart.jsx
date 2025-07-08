import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, // за ос X
  LinearScale,   // за ос Y
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MyChart() {
  const data = {
    labels: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни'],
    datasets: [
      {
        label: 'Продажби',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75,192,192)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Продажби по месеци',
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default MyChart;
