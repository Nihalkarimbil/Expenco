"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./api"; 



const gettall =async()=>{
    const {data}=await axiosInstance.get("/auth/alluser");
    return data;
}

export const useGetall = () => {
    return useQuery({
        queryKey: ["alluser"],
        queryFn: gettall
    });
}