import React, { useContext } from 'react';
import { ExpensesContext } from '../context/ExpensesContext';

function ExpensesTracker() {
    const { expenses, setExpenses } = useContext(ExpensesContext);

    function deleteExpense(index) {
        setExpenses(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length === 0 ? (
                        <tr><td colSpan="5">No expenses</td></tr>
                    ) : (
                        expenses.map((expense, index) => {
                            const dateObj = new Date(expense.date);
                            
                            const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/
                            ${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/
                            ${dateObj.getFullYear()}`;

                            return (
                                <tr key={index}>
                                    <td>{expense.name}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.category}</td>
                                    <td>{formattedDate}</td>
                                    <td><button onClick={() => deleteExpense(index)}>Delete</button></td>
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
