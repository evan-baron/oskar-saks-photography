import { z } from "zod";

export const CONTACT_TOPICS = [
  { value: "portraits", label: "Portraits" },
  { value: "weddings", label: "Weddings & Events" },
  { value: "editorial", label: "Editorial & Brand" },
  { value: "prints", label: "Prints & Custom Work" },
  { value: "other", label: "Something else" },
] as const;

const topicValues = CONTACT_TOPICS.map((topic) => topic.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  topic: z.enum(topicValues),
  date: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, "Tell Oskar a little more (10+ characters).").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
