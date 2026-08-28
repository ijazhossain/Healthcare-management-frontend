/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { IAdminDashboardData } from "@/types/dashboard.type";

export async function getDashboardData(){
    try {
        const response=await httpClient.get<IAdminDashboardData>("/stats");
        return response;
    } catch (error:any) {
        console.log("Error from dashboard server action");
        return{
            success:false,
            message:error.message ||"An error occurred while fetching data from dashboard.",
            data: null,
            meta:null,
        }
    }
}