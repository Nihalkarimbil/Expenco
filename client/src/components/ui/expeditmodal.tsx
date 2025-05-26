import { useAuthStore } from "@/lib/stores/useAuthstore";
import { useGetExpenses } from "@/lib/stores/useExpence";
import axiosInstance from "@/services/api";
import { Button, Dialog, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface expenseData {

  note: string;
  amount: number;
  category: string;
  paymentMethord: string;
  user:string|undefined
}
export interface expenceData {
    id: string|null;
    note: string;
    amount: number;
    category: string;
    paymentMethord: string;
    user:string|undefined
  }

interface edExpModalProps {
  open: boolean;
  onClose: () => void;
  expenseId: expenceData | null;
}

const Expeditmodal: React.FC<edExpModalProps> = ({
  onClose,
  open,
  expenseId,
}) => {

    const { user } = useAuthStore();
    console.log(user);
    
    const {  refetch } = useGetExpenses(user?.id);
  console.log(expenseId?.id);

  const [formData, setFormData] = useState<expenseData>({
    amount: 0,
    note: "",
    category: "",
    paymentMethord: "",
    user:user?.id
  });

  useEffect(() => {
    if (expenseId) {
      setFormData(expenseId);
    }
  }, [expenseId, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      console.log(formData);
      
      e.preventDefault();
      const resp = await axiosInstance.put(`/exp/editExp/${expenseId?.id}`,formData);
      console.log(resp.data);
      
      onClose();
      refetch()
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-4 mb-4">
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              required
              placeholder="0.00"
              InputProps={{
                startAdornment: <span className="mr-1">$</span>,
              }}
            />

            <TextField
              label="Expense Title"
              name="note"
              value={formData.note}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g. Grocery shopping"
            />
          </div>

          <div className="flex justify-between gap-4 mb-6">
            <TextField
              name="category"
              select
              value={formData.category}
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
              value={formData.paymentMethord}
              onChange={handleChange}
              fullWidth
              required
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
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Expense
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default Expeditmodal;
