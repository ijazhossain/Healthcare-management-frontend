"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRole } from "@/enums/user.enums";

import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.type";
import { ILoginResponse } from "@/types/auth.type";


import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction =async (
  payload: ILoginPayload,
  redirectPath?: string
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return { success: false, message: firstError };
  }

  try {
    const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);
    const { accessToken, refreshToken, token, user } = response.data;
    // console.log("response.data",response.data);
    const { role, needPasswordChange, email } = user;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day

    // let redirectUrl: string;

    if (needPasswordChange) {
       redirect(`/reset-password?email=${email}`);
      // TODO: refactoring
      // redirectUrl = `/reset-password?email=${email}`;
    } else {
      const targetPath =
        redirectPath && isValidRedirectForRole(redirectPath, role as UserRole)
          ? redirectPath
          : getDefaultDashboardRoute(role as UserRole);
             redirect(targetPath);
    }

    // return { ...response.data, redirectUrl };
  } catch (error: any) {
     
        if(error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")){
            throw error;
        }
        // console.log(error, "error");
 if (error && error.response && error.response.data.message === "Email not verified") {
            redirect(`/verify-email?email=${payload.email}`);
        }
    // if (error?.response?.data?.message === "Email not verified") {
    //    redirect(`/verify-email?email=${payload.email}`);
    //   return {
    //     success: false,
    //     message: "Email not verified",
    //     redirectUrl: `/verify-email?email=${payload.email}`,
    //  } as any;
    // } 

    return { success: false, message: `Login failed: ${error.message}` };
  }
};
