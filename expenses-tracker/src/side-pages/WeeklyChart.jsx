import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase';
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
    const { user } = useContext(AuthContext);
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setExpenses([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const q = query(collection(db, "expenses"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedExpenses = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setExpenses(fetchedExpenses);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching expenses:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, setExpenses]);


    const weekTotals = new Array(7).fill(0);

    expenses.forEach(expense => {
        let dateObj;
        try {
            dateObj = expense.date.toDate ? expense.date.toDate() : new Date(expense.date);
            const dayIndex = dateObj.getDay();
            weekTotals[dayIndex] += parseFloat(expense.amount);
        } catch (e) {
            console.warn("Грешка при обработка на разход:", expense, e);
        }
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
            <Bar key={expenses.length} data={data} options={options} />
        </div>
    );
}

export default WeeklyChart;
