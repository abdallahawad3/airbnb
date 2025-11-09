import z from "zod";

export const REGISTER_SCHEMA = z.object({
  name: z
    .string("The name must be an string")
    .min(3, "The minimum length is 3 character")
    .max(12, "The maximum length is 12 character"),
  email: z.email("Enter valid email"),
  password: z.string().min(6),
});

export const LOGIN_SCHEMA = z.object({
  email: z.email("Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
