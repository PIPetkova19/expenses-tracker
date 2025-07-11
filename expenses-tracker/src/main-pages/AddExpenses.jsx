import React, { useState, useContext } from 'react';
import { ExpensesContext } from '../context/ExpensesContext'; 
import { AuthContext } from '../context/AuthContext';

function AddExpenses() {
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const { user } = useContext(AuthContext); //!

    function addExpenses(e) {
        e.preventDefault();

        if (!name || !amount || !category || !date) {
            window.alert("Please fill in all fields.");
            return;
        }

        const newExpense = { //!
            id: Date.now().toString(),
            name,
            amount,
            category,
            date,
            userId: user.uid
        };

        setExpenses(prev => [...prev, newExpense]);

        setName("");
        setAmount("");
        setCategory("");
        setDate("");
    }


    function handleSetAmount(event) {
        const value = event.target.value;
        
        if (isNaN(value)) {
            window.alert("Enter a valid number");
            return;
        }

        setAmount(value);
    }

    return (
        <div>
            <h1 className="text-center mt-3 mb-4">Expenses Tracker</h1>

            <div className="d-flex justify-content-center">
                <form onSubmit={addExpenses}>
                    <div className="form-group mb-5">
                        <input className="form-control mb-2" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Expenses name" />
                        <input className="form-control mb-2" type="text" value={amount} onChange={handleSetAmount} placeholder="Expenses amount" />
                        <select className="form-control mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose...</option>
                            <option value="food">Food</option>
                            <option value="bills">Bills</option>
                            <option value="car">Car</option>
                            <option value="clothes">Clothes</option>
                            <option value="health">Health</option>
                            <option value="education">Education</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="others">Others</option>
                        </select>
                        <input className="form-control mb-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        <button className="form-control mb-2 btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddExpenses;
