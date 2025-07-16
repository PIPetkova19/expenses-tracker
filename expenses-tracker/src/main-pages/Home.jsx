import MonthlyChart from '../side-pages/MonthlyChart';
import WeeklyChart from '../side-pages/WeeklyChart';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { ExpensesContext } from '../context/ExpensesContext';
import { IncomeContext } from '../context/IncomeContext';

function Home() {
    const { user } = useContext(AuthContext);
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const { income, setIncome } = useContext(IncomeContext);
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

    let totalAmountExpenses = 0;
    {
        expenses.map(expense => {
            totalAmountExpenses += parseFloat(expense.amount);
        })
    }

    useEffect(() => {
        if (!user) {
            setIncome([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const q = query(collection(db, "income"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedIncome = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setIncome(fetchedIncome);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching income:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, setIncome]);

    let totalAmountIncome = 0;
    {
        income.map(i => {
            totalAmountIncome += parseFloat(i.amount);
        })
    }

    return (
        <div>
            <div id="cards-home">
            <div className="expenses-home-container mt-2 mb-3">
                <div>Expenses</div>
                <div> {totalAmountExpenses.toFixed(2)}лв.</div>
            </div>
            <div className="expenses-home-container mt-2 mb-3">
                <div>Income</div>
                <div> {totalAmountIncome.toFixed(2)}лв.</div>
            </div>
 </div>

            <div id="my-chart">
                <MonthlyChart></MonthlyChart>
                <WeeklyChart></WeeklyChart>
            </div>
        </div>
    );
}

export default Home;
