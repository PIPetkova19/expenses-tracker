import React, { useContext, useEffect, useState } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

function IncomeTracker() {
    const { user } = useContext(AuthContext);
    const { income, setIncome } = useContext(IncomeContext);
    const [loading, setLoading] = useState(true);

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

    async function deleteIncome(id) {
        try {
            await deleteDoc(doc(db, "income", id));
        } catch (error) {
            console.error("Error deleting income:", error);
            alert("Error deleting.");
        }
    }

    if (loading) return <p>Зареждане на приходите...</p>;
    if (!user) return <p>Моля, влезте в профила си, за да видите разходите.</p>;
    if (income.length === 0) return <p>Няма приходи.</p>;

    return (
        <div>
            <h1 className="text-center">Income Tracker</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Име</th>
                        <th>Сума</th>
                        <th>Категория</th>
                        <th>Дата</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {income.map(i => {
                        const dateObj = i.date && i.date.toDate ? i.date.toDate() : new Date(i.date);

                        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/` +
                            `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/` +
                            `${dateObj.getFullYear()}`;

                        return (
                            <tr key={i.id}>
                                <td>{i.name}</td>
                                <td>{i.amount}</td>
                                <td>{i.category}</td>
                                <td>{formattedDate}</td>
                                <td>
                                    <button onClick={() => deleteIncome(i.id)}>Изтрий</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default IncomeTracker;
