import { z } from "zod/v4";

export const loginSchema = z.object({
    username: z.string().trim().min(3, "Username is required"),
    password: z.string().trim().min(3, "Password is required"),
})