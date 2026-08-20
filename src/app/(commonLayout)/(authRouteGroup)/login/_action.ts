"use server"
import { UserRole } from "@/enums/user.enums";
/* eslint-disable @typescript-eslint/no-explicit-any */

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
): Promise<(ILoginResponse & { redirectUrl: string }) | ApiErrorResponse> => {
  const parsedPayload = loginZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return { success: false, message: firstError };
  }

  try {
    const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);
    const { accessToken, refreshToken, token, user } = response.data;
    const { role, needPasswordChange, email } = user;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day

    let redirectUrl: string;

    if (needPasswordChange) {
      // TODO: refactoring
      redirectUrl = `/reset-password?email=${email}`;
    } else {
      redirectUrl =
        redirectPath && isValidRedirectForRole(redirectPath, role as UserRole)
          ? redirectPath
          : getDefaultDashboardRoute(role as UserRole);
    }

    return { ...response.data, redirectUrl };
  } catch (error: any) {
    console.log(error, "error");

    if (error?.response?.data?.message === "Email not verified") {
      return {
        success: false,
        message: "Email not verified",
        redirectUrl: `/verify-email?email=${payload.email}`,
      } as any;
    }

    return { success: false, message: `Login failed: ${error.message}` };
  }
};
