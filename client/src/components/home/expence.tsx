"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useExpencestore, useGetExpenses } from "@/lib/stores/useExpence";
import { useAuthStore } from "@/lib/stores/useAuthstore";
import Expeditmodal, { expenceData } from "../ui/expeditmodal";

function Expence() {
  const { addexpences, error,deleteExpense } = useExpencestore();
  
  const [expId, setExpId] = useState<expenceData | null>(null);
  const { user } = useAuthStore();
  const { data: expenses, refetch } = useGetExpenses(user?.id);
  const [isOpen,setIsopen]=useState(false)
  const [expenseData, setExpenseData] = useState({
    note: "",
    amount: 0,
    date: "",
    category: "",
    paymentMethord: "",
  });
  const handleopen= (id:expenceData)=>{
    setIsopen(!isOpen)
    setExpId(id)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDlt =(id:string)=>{
    deleteExpense(id)
    refetch()
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { note, amount, category, paymentMethord } = expenseData;
    await addexpences({
      note,
      amount,
      category,
      paymentMethord,
      user: user?.id ?? null,
    });

    setTimeout(() => {
      if (useExpencestore.getState().isSucces) {
        alert("Expense added successfully");
        setExpenseData({
          note: "",
          amount: 0,
          date: "",
          category: "",
          paymentMethord: "",
        });
        refetch();
      }
    }, 100);
  };

  return (
    <div>
      <div className="bg-blue-50 p-10 rounded-3xl h-[600px] overflow-auto scrollbar-none">
        <div className="flex justify-between mx-auto px-2">
          <h1 className="text-2xl font-bold text-blue-500">Expenses</h1>
          <Button variant="contained" color="primary">
            Add expenses
          </Button>
        </div>

        <div className="bg-white mt-10 p-10 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-blue-400">
            Enter New Expense
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-4">
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={expenseData.amount}
                onChange={handleChange}
                fullWidth
                required
                placeholder="0.00"
                InputProps={{
                  startAdornment: <span className="mr-1">$</span>,
                }}
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={expenseData.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Expense Title"
                name="note"
                value={expenseData.note}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g. Grocery shopping"
              />
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <TextField
                name="category"
                select
                value={expenseData.category}
                onChange={handleChange}
                fullWidth
                required
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </TextField>

              <TextField
                name="paymentMethord"
                select
                value={expenseData.paymentMethord}
                onChange={handleChange}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled>
                  Select payment method
                </option>
                <option value="Cash">Cash</option>
                <option value="Card">Credit Card</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </TextField>
            </div>

            <div className="mt-8 flex justify-end gap-6">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  setExpenseData({
                    note: "",
                    amount: 0,
                    date: "",
                    category: "",
                    paymentMethord: "",
                  })
                }
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Expense
              </Button>
            </div>
          </form>
          {error && <h1 className="text-red-400">{error}</h1>}
        </div>

 
        <div className="bg-white mt-10 p-10 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-blue-400">
            Recent Expenses
          </h2>
          {expenses && Array.isArray(expenses) && expenses.length === 0 ? (
            <p className="text-gray-500 italic">No expenses added yet.</p>
          ) : (
            expenses &&
            Array.isArray(expenses) && (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Date</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Category
                      </th>
                      <th className="border border-gray-300 px-4 py-2">Note</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Amount
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Payment Method
                      </th>
                      <th className="border border-gray-300 px-4 py-2">action</th>
                      <th className="border border-gray-300 px-4 py-2">delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-300 px-4 py-2">
                          {expense.createdAt
                            ? new Date(expense.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {expense.category}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {expense.note}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          ${expense.amount}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {expense.paymentMethord}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Button onClick={()=>handleopen(expense)}>edit</Button>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Button onClick={()=>handleDlt(expense.id)}>delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
      <Expeditmodal  open={isOpen}
        onClose={() => setIsopen(false)}
        expenseId={expId}
        />
    </div>
  );
}

export default Expence;
