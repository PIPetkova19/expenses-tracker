import React, { useContext } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';
import { AuthContext } from '../context/AuthContext';

function ExpensesTracker() {
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const { user } = useContext(AuthContext); //!

    // Филтрирам само разходите на текущия потребител
    const userExpenses = expenses.filter(expense => expense.userId === user.uid);

    function deleteExpense(id) {
        setExpenses(prev => prev.filter(expense => expense.id !== id)); //!
    }

    return (
        <div>
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
                    {userExpenses.length === 0 ? (
                        <tr><td colSpan="5">Няма разходи</td></tr>
                    ) : (
                        userExpenses.map(expense => {
                            const dateObj = new Date(expense.date);
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
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ExpensesTracker;
