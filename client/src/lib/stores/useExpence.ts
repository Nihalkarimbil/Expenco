import axiosInstance from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

interface Expense {
  user: string | null;
  amount: number;
  category: string;
  paymentMethord: string;
  note: string;
}

export interface Expenses {
  _id: string;
  user: string;
  amount: number;
  category: string;
  paymentMethod: string;
  note: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface expencestate {
  expence: Expense | null;
  loading: boolean;
  error: string | null;
  Expenses: Expenses | null;
  isSucces: boolean;
  addexpences: (newExpence: Expense) => Promise<void>;
  deleteExpense:(id :string)=>Promise<void>
}

export const useExpencestore = create<expencestate>((set) => ({
  expence: null,
  loading: false,
  error: null,
  isSucces: false,
  Expenses: null,

  addexpences: async (newExpence: Expense) => {
    set({ loading: true, error: null, isSucces: false });
    try {
      const response = await axiosInstance.post("/exp/addExpence", newExpence);
      if (response.data) {
        set({ isSucces: true, loading: false });
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      set({ error: "Adding expense failed", loading: false, isSucces: false });
    }
  },
  deleteExpense:async(id :string)=>{
    set({ loading: true, error: null, isSucces: false });
    try {
      const res= await axiosInstance.put(`/exp/deleteExp/${id}`)
      if (res.data) {
        set({ isSucces: true, loading: false });
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      set({ error: "deleting expense failed", loading: false, isSucces: false });
    }
  }
}));

export const useGetExpenses = (userid: string | undefined) => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/exp/allExpence/${userid}`);
      console.log(response.data.data);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetTotalExpense = (userid: string | undefined) => {
    return useQuery({
      queryKey: ["totalexpens"],
      queryFn: async () => {
        const response = await axiosInstance.get(`/exp/totalamout/${userid}`);
        console.log(response.data.data);
        return response.data.data;
      },
      staleTime: 1000 * 60 * 5,
    });
};
  