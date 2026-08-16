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
import { useState } from "react";
import AppField from "../shared/AppField";
import { Button } from "../ui/button";
import { loginZodSchema } from "@/zod/auth.validation";
import { Alert, AlertDescription } from "../ui/alert";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError,setServerError]=useState<string|null>(null)
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
      try {
        
      } catch (error:any) {
        setServerError(null);
        console.log(`Login failed: ${error.message}`);
        setServerError(`Login failed: ${error.message}`);
        
      }
    },
  });
  return (
    <Card className="max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
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
              <div>
                <button
                  className="bg-black text-white px-2 py-1 rounded-lg"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "..." : "Submit"}
                </button>
                <button
                  className="ml-2 bg-black text-white px-2 py-1 rounded-lg"
                  type="reset"
                  onClick={(e) => {
                    // Avoid unexpected resets of form elements (especially <select> elements)
                    e.preventDefault();
                    form.reset();
                  }}
                >
                  Reset
                </button>
              </div>
            )}
            
          
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};
export default LoginForm;
