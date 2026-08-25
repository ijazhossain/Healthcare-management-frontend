"use server"
import { httpClient } from "@/lib/axios/httpClient";

export const getDoctors=async ()=>{
try {
    const doctors= await httpClient.get("/doctors");
    return doctors
} catch (error) {
    console.log(error);
    throw error;
}
}