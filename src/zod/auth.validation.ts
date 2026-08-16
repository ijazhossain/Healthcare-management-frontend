import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.email({ error: "Invalid email address." }),

  password: z
    .string({ error: "Password is required" })
    .min(1, { error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long." })
    .max(20, { error: "Password length must be 20 characters or less." }),
});