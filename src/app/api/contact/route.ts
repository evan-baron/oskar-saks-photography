import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_TOPICS, contactSchema } from "@/lib/contactValidation";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/siteConfig";

const MAX_BODY_BYTES = 20 * 1024;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message is too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const parsedBody: unknown = JSON.parse(raw);
    if (typeof parsedBody !== "object" || parsedBody === null) throw new Error("bad body");
    body = parsedBody as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { website, ...fields } = body;
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const parsed = contactSchema.safeParse(fields);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, email, topic, date, message } = parsed.data;
  const topicLabel = CONTACT_TOPICS.find((item) => item.value === topic)?.label ?? topic;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] RESEND_API_KEY / CONTACT_FROM_EMAIL not set. Message:", parsed.data);
      return NextResponse.json({ success: true }, { status: 201 });
    }
    console.error("[contact] Email is not configured.");
    return NextResponse.json({ error: "We could not send your message. Please try again later." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `${SITE_NAME}: ${topicLabel} inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Interested in: ${topicLabel}`,
      date ? `Date / timing: ${date}` : null,
      "",
      message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "We could not send your message. Please try again later." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
