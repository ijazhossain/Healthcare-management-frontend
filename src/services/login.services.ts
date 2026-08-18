/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.type";
import { ILoginResponse } from "@/types/auth.type";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";

export const loginAction = async (payload: ILoginPayload) => {
  const parsedPayload = loginZodSchema.safeParse(payload);
  console.log("parsedPayload", parsedPayload);
  try {
    if (!parsedPayload.success) {
      // console.log(parsedPayload);
    }
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data,
    );
    // console.log("response",response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `Login failed: ${error.message}`,
    };
  }
};
