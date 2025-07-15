import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddExpense() {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    function handleSetAmount(e) {
        setAmount(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !amount || !category || !date) {
            alert("Please fill all fields");
            return;
        }

        const expense = {
            name,
            amount: parseFloat(amount),
            category,
            date: Timestamp.fromDate(new Date(date)),
            userId: user.uid
        };

        try {
            console.log("Expense to be added:", expense);
            await addDoc(collection(db, "expenses"), expense);//!
            alert("Expense added!");
            setName("");
            setAmount("");
            setCategory("");
            setDate("");
        } catch (error) {
            console.error(error);
            alert("Failed to add expense");
        }
    }

    return (
        <div>
            <h1 className="text-center mt-3 mb-4">Expenses Tracker</h1>

            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
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
                        <button className="form-control mb-2 btn btn-primary" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddExpense;
