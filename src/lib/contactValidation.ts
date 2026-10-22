import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  // Topics follow the editable services list, so the route checks membership against the current one.
  topic: z.string().trim().min(1).max(60),
  date: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, "Tell Oskar a little more (10+ characters).").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
