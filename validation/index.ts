import z from "zod";

export const REGISTER_SCHEMA = z.object({
  username: z
    .string("The username must be an string")
    .min(3, "The minimum length is 3 character")
    .max(12, "The maximum length is 12 character"),
  email: z.email("Enter valid email"),
  password: z.string().min(6),
});
