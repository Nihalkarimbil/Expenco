"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useExpencestore, useGetExpenses } from "@/lib/stores/useExpence";
import { useAuthStore } from "@/lib/stores/useAuthstore";

function Budget() {
  const { addexpences, error } = useExpencestore();
  const { user } = useAuthStore();
  const { data: expenses, refetch } = useGetExpenses(user?._id);

  const [expenseData, setExpenseData] = useState({
    category: "",
    amount: 0,
    month:0,
    year:0,

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

   
  };

  return (
    <div>
      <div className="bg-blue-50 p-10 rounded-3xl h-[600px] overflow-auto scrollbar-none">
        <div className="flex justify-between mx-auto px-2">
          <h1 className="text-2xl font-bold text-blue-500">
            Monthly Budget
          </h1>
          <Button variant="contained" color="primary">
            Add Budget
          </Button>
        </div>

        {/* Form Section */}
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
                name="month"
                type="date"
                value={expenseData.month}
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
                value={expenseData.year}
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
                  setExpenseData({
                    amount:0,
                

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

        
      </div>
    </div>
  );
}

export default Budget;
