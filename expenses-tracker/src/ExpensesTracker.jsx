import React, { useContext } from 'react';
import { ExpensesContext } from './ExpensesContext';

function ExpensesTracker() {
    const { expenses, setExpenses } = useContext(ExpensesContext); //!

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
                        expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.name}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.date}</td>
                                <td><button onClick={() => deleteExpense(index)}>Delete</button></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ExpensesTracker;
