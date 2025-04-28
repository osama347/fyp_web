import { z } from 'zod';

// Shared schema for email and password
const authSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const signUpSchema = authSchema;
export const signInSchema = authSchema;