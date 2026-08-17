"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "@tanstack/react-form";
import { Label } from "../ui/label";
import { Eye } from "lucide-react";
import { useState } from "react";
const LoginForm = () => {
    const[show, setShow]=useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      // console.log(value);
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>
          Please enter your credentials to log in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form method="POST" action="#" noValidate onSubmit={(e)=>  { e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()}}>
          <div>
          {/* ✅ Nesting the render function inside <form.Field> tags */}
            <form.Field name="email">
              {(field) => (
                <>
                  <Label htmlFor={field.name}>Email</Label>
                  <input
                  className="border border-gray-300 rounded-md w-1/4 p-1 mt-2"
                  type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
              </form.Field>
            <form.Field name="password">
              {(field) => (
                <div className="relative">
                  <Label htmlFor={field.name}>Password</Label>
                  <input
                  className="border border-gray-300 rounded-md w-1/4 p-1 mt-2"
                  type={show?"text":"password"}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    // onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Eye className="absolute left-65 bottom-1 cursor-pointer" onClick={()=>console.log(setShow(!show))}></Eye>
                </div>
              )}
              </form.Field>
        </div>
         <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
               <div className="mt-3">
              <button className="bg-black text-white px-2 py-1 rounded-lg" type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <button
              className="ml-2 bg-black text-white px-2 py-1 rounded-lg"
                type="reset"
                onClick={(e) => {
                  // Avoid unexpected resets of form elements (especially <select> elements)
                  e.preventDefault()
                  form.reset()
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
