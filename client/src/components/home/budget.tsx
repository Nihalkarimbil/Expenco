"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAuthStore } from "@/lib/stores/useAuthstore";
import { useBudgetStore, useGetAllbudgets } from "@/lib/stores/useBudgetStore";
import { Budgets as BudgetType } from "@/lib/stores/useBudgetStore";

function Budget() {
  const { user } = useAuthStore();
  const { addBudget } = useBudgetStore();
  const { data: budgetsData, refetch } = useGetAllbudgets(user?._id);
  

  const [Budjet, setBudgetData] = useState({
    category: "",
    amount: 0,
    month: 0,
    year: 2025,
  });
  console.log(Budjet);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBudgetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amount, category, month, year } = Budjet;
    await addBudget({
      user: user?._id ?? null,
      amount,
      category,
      month,
      year,
    });

    setTimeout(() => {
      if (useBudgetStore.getState().isSucces) {
        alert("Expense added successfully");
        setBudgetData({
          category: "",
          amount: 0,
          month: 0,
          year: 2025,
        });
        refetch();
      }
    }, 100);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div>
      <div className="bg-blue-50 p-10 rounded-3xl h-[600px] overflow-auto scrollbar-none">
        <div className="flex justify-between mx-auto px-2">
          <h1 className="text-2xl font-bold text-blue-500">Monthly Budget</h1>
          <Button variant="contained" color="primary">
            Add Budget
          </Button>
        </div>

        <div className="bg-white mt-10 p-10 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-blue-400">
            Enter Budget Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-4">
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={Budjet.amount}
                onChange={handleChange}
                fullWidth
                required
                placeholder="0.00"
                InputProps={{
                  startAdornment: <span className="mr-1">$</span>,
                }}
              />
              <TextField
                label="Month"
                name="month"
                value={Budjet.month}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Year"
                name="year"
                value={Budjet.year}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g. Grocery shopping"
              />
              <TextField
                label="Category"
                name="category"
                type="text"
                value={Budjet.category}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g. Grocery shopping"
              />
            </div>

            <div className="mt-8 flex justify-end gap-6">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  setBudgetData({
                    amount: 0,
                    category: "",
                    year: 0,
                    month: 0,
                  })
                }
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                add Budget
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-700 mb-4">My Monthly Budgets</h2>
          {Array.isArray(budgetsData) && budgetsData.length === 0 ? (
            <div>No Budget available</div>
          ) : (
            <table className="w-full mt-4 border border-gray-200 text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-300">Month</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Year</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Category</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Amount</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {budgetsData?.map((value: BudgetType, index: number) => (
                  <tr key={index} className="border-t">
                    <td className="border border-gray-300 px-4 py-2">{monthNames[value.month-1]}</td>
                    <td className="border border-gray-300 px-4 py-2">{value.year}</td>
                    <td className="border border-gray-300 px-4 py-2">{value.category}</td>
                    <td className="border border-gray-300 px-4 py-2">${value.amount}</td>
                    <td className="border border-gray-300 px-4 py-2"><Button>edit</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Budget;
