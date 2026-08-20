/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import AppField from "../shared/form/AppField";
import { Button } from "../ui/button";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { Alert, AlertDescription } from "../ui/alert";
import AppSubmitButton from "../shared/form/AppSubmitButton";
import GoogleLoginButton from "../shared/form/GoogleLoginButton";
import FormDivider from "../shared/form/FormDivider";
import Link from "next/link";
import FormFooter from "../shared/form/FormFooter";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action";
import { useRouter } from "next/navigation";


interface LoginFormProps {
    redirectPath ?: string;
}
const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const{mutateAsync,isPending}=useMutation({
    mutationFn:(payload:ILoginPayload)=>loginAction(payload,redirectPath)
  })
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
  setServerError(null);
  const result = (await mutateAsync(value)) as any;
console.log("LOGIN RESULT:", result);
if (result?.redirectUrl) {
   startTransition(() => {
    router.push(result.redirectUrl);
  });
  return;
}
if (result?.success === false) {
  setServerError(result.message || "Login failed");
}
},
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
      <Card className="w-full md:w-[50%]   shadow-md p-3">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold pt-5">
            Welcome Back!
          </CardTitle>
          <CardDescription>
            Please enter your credentials to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            method="POST"
            action="#"
            noValidate
            onSubmit={(e) => {
               e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <form.Field
                name="email"
                validators={{ onChange: loginZodSchema.shape.email }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                  />
                )}
              </form.Field>
              <form.Field
                name="password"
                validators={{ onChange: loginZodSchema.shape.password }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    append={
                      <Button
                        className="cursor cursor-pointer"
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        variant="ghost"
                        size="icon"
                      >
                        {showPassword ? (
                          <Eye className="size-4" aria-hidden="true" />
                        ) : (
                          <EyeOff className="size-4" aria-hidden="true" />
                        )}
                      </Button>
                    }
                  />
                )}
              </form.Field>
              {/* Forgot password */}
              <div className="text-right mt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              {serverError && (
                <Alert variant={"destructive"}>
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}
            </div>
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={
                    isSubmitting||isPending
                  }
                  pendingLabel="Logging In..."
                  disabled={!canSubmit}
                >
                  Login
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
          {/* form divider */}
          <FormDivider />
          {/* google login button */}
          <GoogleLoginButton
            label=" Sign in with Google"
            redirectEndpoint="/auth/login/google"
          ></GoogleLoginButton>
        </CardContent>
        <FormFooter label=" Don't have an account?">
          {" "}
          Sign Up for an account
        </FormFooter>
      </Card>
    </div>
  );
};
export default LoginForm;
