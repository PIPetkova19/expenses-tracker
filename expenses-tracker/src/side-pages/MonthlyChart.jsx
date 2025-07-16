import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase';

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

  const monthTotals = new Array(12).fill(0);
  expenses.forEach(expense => {
    let dateObj;
    try {
      dateObj = expense.date.toDate ? expense.date.toDate() : new Date(expense.date);
      const monthIndex = dateObj.getMonth();
      monthTotals[monthIndex] += parseFloat(expense.amount);
    } catch (e) {
      console.warn("Грешка при обработка на разход:", expense, e);
    }
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
<Line key={expenses.length} data={data} options={options} />
    </div>
  );
}

export default MonthlyChart;
