import React, { useState } from 'react'

function ExpensesTracker() {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    function addExpenses(e) {
        e.preventDefault();//за да не презарежда страницата бутона

        if (!name || !amount || !category || !date) {
            window.alert("Please fill in all fields.");
            return;
        }
        const newExpenses = { name, amount, category, date };
        setExpenses(prevExpenses => [...prevExpenses, newExpenses]);
        setName("");
        setAmount("");
        setCategory("");
        setDate("");
    }

    function deleteExpense(index) {
        setExpenses(prevExpenses => prevExpenses.filter((_, i) => i !== index));
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
                <form>
                    <div class="form-group mb-5">

                        <input className="form-control mb-2" type="text" id="expenses-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Expenses name" required></input>
                        <input className="form-control mb-2" type="text" id="expenses-amount" value={amount} onChange={handleSetAmount} placeholder="Expenses amount" required></input>

                        <select className="form-control mb-2" id="expenses-category" value={category} onChange={(event) => setCategory(event.target.value)} required>
                            <option selected>Choose...</option>
                            <option value="food">Food</option>
                            <option value="bills">Bills</option>
                            <option value="car">Car</option>
                            <option value="clothes">Clothes</option>
                            <option value="health">Health</option>
                            <option value="education">Education</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="others">Others</option>
                        </select>

                        <input className="form-control mb-2" type="date" value={date} onChange={(event) => setDate(event.target.value)} id="expenses-date" required></input>
                        <input className="form-control mb-2" type="submit" value="Submit" onClick={addExpenses} required />

                    </div>
                </form>
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td scope="row">{expense.name}</td>
                                <td scope="row">{expense.amount}</td>
                                <td scope="row">{expense.category}</td>
                                <td scope="row">{expense.date}</td>
                                <td scope="row"><button onClick={() => deleteExpense(index)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ExpensesTracker