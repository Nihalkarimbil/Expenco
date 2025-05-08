import { Button, Dialog, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { budgetdata } from "../home/budget";
import axiosInstance from "@/services/api";
import { useAuthStore } from "@/lib/stores/useAuthstore";
import { useGetAllbudgets } from "@/lib/stores/useBudgetStore";

interface BudeditmodalProps {
    open: boolean;
    onClose: () => void;
    selectedbud: budgetdata | null

}
const Budgetedit: React.FC<BudeditmodalProps> = ({ open, onClose, selectedbud }) => {

    const {user}=useAuthStore()
    
      const { refetch } = useGetAllbudgets(user?._id);
    const [budget, setBudget] = useState<budgetdata>({
        amount: 0,
        category: "",
        year: 0,
        month: 0,
    });

    useEffect(() => {
        if (selectedbud) {
            setBudget(selectedbud);
        }
    }, [selectedbud, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBudget((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async(e:React.FormEvent) => {
        try {
            e.preventDefault();
            const {amount,year,month}=budget
            const editable={amount:amount,month:month,year:year}
            const res= await axiosInstance.put(`/budg/updatebudget/${user?._id}`,editable)
            console.log(res.data);
            refetch()
            
            onClose();
        } catch (error) {
            console.log(error);
            
            
        }
       
    };

    const handleCancel = () => {
        setBudget({
            amount: 0,
            category: "",
            year: 0,
            month: 0,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex flex-col gap-4">
                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        value={budget.amount}
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
                        value={budget.month}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Year"
                        name="year"
                        value={budget.year}
                        onChange={handleChange}
                        fullWidth
                        required
                        placeholder="2025"
                    />
                    <TextField
                        label="Category"
                        name="category"
                        type="text"
                        value={budget.category}
                        onChange={handleChange}
                        fullWidth
                        required
                        placeholder="e.g. Grocery shopping"
                    />
                </div>

                <div className="mt-8 flex justify-end gap-6">
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Add Budget
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default Budgetedit;
