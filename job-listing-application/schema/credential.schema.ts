import { credentialsMessages, passwordRegex } from '@/utils/helper';
import { z } from 'zod';
export const signupSchema = z
  .object({
    name: z
      .string({
        error: credentialsMessages.name.required,
      })
      .min(2, { message: credentialsMessages.name.min })
      .max(30, { message: credentialsMessages.name.max }),
    email: z.email({ message: credentialsMessages.email.invalid }).nonempty({
      error: credentialsMessages.email.required,
    }),
    password: z
      .string({
        error: credentialsMessages.password.required,
      })
      .refine((val) => passwordRegex.test(val), {
        message: credentialsMessages.password.invalid,
      }),
    confirmPassword: z.string({
      error: credentialsMessages.confirmPassword.required,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    error: credentialsMessages.confirmPassword.mismatch,
  });

export type signupSchemaType = z.infer<typeof signupSchema>;

export const signinSchema = signupSchema.pick({
  email: true,
  password: true,
});

export type signinSchemaType = z.infer<typeof signinSchema>;
