"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal/Reveal";
import { CONTACT_PREFILL_EVENT, type ContactPrefill } from "@/lib/contactPrefill";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, LOCATION } from "@/lib/siteConfig";
import styles from "./contact.module.scss";

type Status = "idle" | "sending" | "sent" | "error";

type ContactProps = {
  topics: readonly { value: string; label: string }[];
};

export default function Contact({ topics }: ContactProps) {
  const emptyForm = { name: "", email: "", topic: topics[0]?.value ?? "other", date: "", message: "", website: "" };
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { topic, message } = (event as CustomEvent<ContactPrefill>).detail;
      setStatus("idle");
      setForm((current) => ({
        ...current,
        topic,
        message: message ?? current.message,
      }));
    };
    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setForm(emptyForm);
      setStatus("sent");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <Reveal>
            <p className={styles.eyebrow}>Contact</p>
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.title}>
            <span id="contact-title">
              Let&rsquo;s make <em>something</em>.
            </span>
          </Reveal>
          <Reveal as="p" delay={160} className={styles.lede}>
            Tell Oskar about your day, your project, or the print you can&rsquo;t stop thinking about.
            Replies usually land within two business days.
          </Reveal>
          <Reveal delay={240} className={styles.details}>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={styles.link}>
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {INSTAGRAM_HANDLE}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Based</dt>
                <dd>{LOCATION}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} className={styles.formWrap}>
          {status === "sent" ? (
            <div className={styles.success} role="status">
              <p className={styles.successTitle}>
                Thank <em>you</em>.
              </p>
              <p>Your message is on its way. Oskar will be in touch shortly.</p>
              <button type="button" className={styles.again} onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  maxLength={200}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="topic">I&rsquo;m interested in</label>
                  <div className={styles.select}>
                    <select id="topic" name="topic" value={form.topic} onChange={handleChange}>
                      {topics.map((topic) => (
                        <option key={topic.value} value={topic.value}>
                          {topic.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="date">
                    Date or timing <span>(optional)</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="text"
                    maxLength={60}
                    placeholder="e.g. June 2027"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={4000}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.trap} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              {status === "error" && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className={styles.submit} disabled={status === "sending"}>
                <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
