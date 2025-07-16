import MonthlyChart from '../side-pages/MonthlyChart';
import WeeklyChart from '../side-pages/WeeklyChart';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { ExpensesContext } from '../context/ExpensesContext';

function Home() {
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

    let totalAmount = 0;
    {
        expenses.map(expense => {
            totalAmount += parseFloat(expense.amount);
        })
    }

    return (
        <div>
            <div id="expenses-home-container" className='mt-2'>
            <div>Expenses</div>   
           <div> {totalAmount.toFixed(2)}лв.</div>  
            </div>

            <div id="my-chart">
                <MonthlyChart></MonthlyChart>
                <WeeklyChart></WeeklyChart>
            </div>
        </div>
    );
}

export default Home;
