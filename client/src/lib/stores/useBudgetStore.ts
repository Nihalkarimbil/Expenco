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
