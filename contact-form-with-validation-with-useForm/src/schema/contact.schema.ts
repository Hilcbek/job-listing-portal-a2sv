import { contactMessages } from '@/utils/constant';
import z from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .nonempty({ error: contactMessages.name.required })
    .min(3, { error: contactMessages.name.min })
    .max(20, {
      error: contactMessages.name.max,
    }),
  email: z
    .email()
    .nonempty({ error: contactMessages.email.valid })
    .nonempty({ error: contactMessages.email.required })
    .refine((value) => value.includes('@'), {
      error: contactMessages.email.mustContain,
    }),
  message: z
    .string()
    .nonempty({ error: contactMessages.message.required })
    .max(200, { error: contactMessages.message.max }),
});

export type contactSchemaType = z.infer<typeof contactSchema>;
