import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { ExpensesContext } from '../context/ExpensesContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const monthLabels = [
  'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
  'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
];

function MonthlyChart() {
  const { expenses } = useContext(ExpensesContext);

  const monthTotals = new Array(12).fill(0);
  expenses.forEach(expense => {
    const month = new Date(expense.date).getMonth(); // 0-11
    monthTotals[month] += parseFloat(expense.amount);
  });

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthTotals, //!
        borderColor: 'rgb(247, 113, 231)',
        backgroundColor: 'rgb(247, 113, 231)',
        tension: 0.3   // закръгленост
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Monthly Expenses',
      },
    },
  };

return (
  <div style={{ flex: '1 1 45%', maxWidth: '45%' }}>
    <Line data={data} options={options} />
  </div>
);}

export default MonthlyChart;
