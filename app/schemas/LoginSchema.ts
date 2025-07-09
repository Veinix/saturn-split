import { z } from "zod/v4";

export const LoginSchema = z.object({
    username: z.string().trim().min(3, "Username is required").max(32, "Username is required"),
    password: z.string().trim().min(3, "Password is required").max(32, "Password is required"),
})