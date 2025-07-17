import React, { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

function ExpensesTracker() {
    const { user } = useContext(AuthContext);
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            //това не триe доходите от базата данни, 
            // а просто променя локалното състояние на React компонента и го прави празен масив.
            setExpenses([]); // Ако няма потребител, нулира разходите
            setLoading(false); // Спира зареждането
            return;
        }

        setLoading(true); // Започва зареждане

        // Създава заявка към колекцията "expenses", филтрирана по userId
        const q = query(collection(db, "expenses"), where("userId", "==", user.uid));
        // onSnapshot създава слушател в реално време за промените
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedExpenses = querySnapshot.docs.map(doc => ({
                id: doc.id,
                //всички полета от документа(name, amount...)
                ...doc.data()
            }));
            setExpenses(fetchedExpenses);  // Обновявам разходите
            setLoading(false);
        }, (error) => {
            console.error("Error fetching expenses:", error);
            setLoading(false);
        });

        // Премахва слушателя при напускане на компонента или промяна на user
        return () => unsubscribe();
    }, [user, setExpenses]); // Ефектът ще се изпълнява при промяна на user или setExpenses

    async function deleteExpense(id) {
        try {
            await deleteDoc(doc(db, "expenses", id));
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert("Error deleting.");
        }
    }

    if (loading) return <p>Зареждане на разходите...</p>;
    if (!user) return <p>Моля, влезте в профила си, за да видите разходите.</p>;
    if (expenses.length === 0) return <p>Няма разходи.</p>;

    return (
        <div>
            <h1 className="text-center">Expenses Tracker</h1>

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
                    {expenses.map(expense => {
                        // от Firestore Timestamp към JS Date
                        //проверява дали съществува и дали има метод toDate, който е за Timestamp
                        const dateObj = expense.date && expense.date.toDate
                        //ако е Timestamp
                         ? expense.date.toDate() 
                         //ако е Date или String
                         : new Date(expense.date);

                        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/` +
                            `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/` +
                            `${dateObj.getFullYear()}`;

                        return (
                            <tr key={expense.id}>
                                <td>{expense.name}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{formattedDate}</td>
                                <td>
                                    <button onClick={() => deleteExpense(expense.id)}>Изтрий</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ExpensesTracker;
