import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { ExpensesContext } from '../context/ExpensesContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const dayLabels = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];

function WeeklyChart() {
    const { expenses } = useContext(ExpensesContext);

    const weekTotals = new Array(7).fill(0);
    expenses.forEach(expense => {
        const dayIndex = new Date(expense.date).getDay();
        weekTotals[dayIndex] += parseFloat(expense.amount);
    });

    const data = {
        labels: dayLabels,
        datasets: [
            {
                label: 'Weekly expenses',
                data: weekTotals,
                borderColor: 'rgb(247, 113, 231)',
                backgroundColor: 'rgb(247, 113, 231)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Weekly expenses' }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ flex: '1 1 45%', maxWidth: '45%' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default WeeklyChart;
