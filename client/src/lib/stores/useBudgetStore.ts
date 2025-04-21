import axiosInstance from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

export interface Budgets {
    _id: string;
    user: string | null;
    amount: number;
    category: string;
    month: number;
    year: number;
    isDeleted:boolean
}
interface Budget {
    user: string | null;
    amount: number;
    category: string;
    month: number;
    year: number;
}

interface budgetstate {
    budget: Budget | null;
    loading: boolean;
    error: string | null;
    isSucces: boolean;
    addBudget: (newBudget: Budget) => Promise<void>;
    deletebudget:(id:string)=>Promise<void>
}

export const useBudgetStore = create<budgetstate>((set) => ({
    budget: null,
    loading: false,
    error: null,
    isSucces: false,
    addBudget: async (newBudget: Budget) => {
        set({ isSucces: false, loading: true });
        try {
            const res = await axiosInstance.post("/budg/addBudget", newBudget);
            if (res.data) {
                set({ isSucces: true, loading: false, error: null });
            }
        } catch (error) {
            console.log(error);
            set({ error: "therw is an error on adding budget" });
        }
    },
    deletebudget: async(id)=>{
        set({isSucces:false,loading:true});
        try {
            const res=await axiosInstance.put(`/budg/deletebudget/${id}`)
            if (res.data) {
                set({ isSucces: true, loading: false, error: null });
            }
        } catch (error) {
            console.log(error);
            
            set({ error: "therw is an error on deleting budget" })
        }
    }
}));

export const useGetBudget = (userid: string | undefined, month: number) => {
    return useQuery({
        queryKey: ["budget"],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/budg/getmonthlybudget/${userid}?month=${month}&year=2025`
            );
            console.log(response.data.data);
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};


export const useGetAllbudgets = (user: string | undefined) => {
    return useQuery({
        queryKey: ["allBudget"],
        queryFn: async () => {
            const resp = await axiosInstance.get(`/budg/getBudgetof/${user}`)
            console.log(resp.data);
            return resp.data.data
        },
        staleTime: 1000 * 60 * 5
    })
}