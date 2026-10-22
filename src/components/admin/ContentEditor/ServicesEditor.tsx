"use client";

import { useState } from "react";
import { updateServicesContentAction } from "@/app/admin/content-actions";
import type { ServicesContent } from "@/lib/contentSchema";
import SaveBar from "./SaveBar";
import { TITLE_HINT } from "./hints";
import { useSave } from "./useSave";
import styles from "./contentEditor.module.scss";

// Edited as strings, then parsed on save: the price input and the one-per-line list are both text until then.
type Draft = { id: string; title: string; description: string; startingAt: string; includes: string };

const MAX_SERVICES = 12;

export default function ServicesEditor({ content }: { content: ServicesContent }) {
  const { pending, message, save } = useSave();
  const [items, setItems] = useState<Draft[]>(() =>
    content.items.map((item) => ({ ...item, startingAt: String(item.startingAt), includes: item.includes.join("\n") })),
  );

  const update = (id: string, patch: Partial<Draft>) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const move = (index: number, by: number) =>
    setItems((current) => {
      const next = [...current];
      const [moved] = next.splice(index, 1);
      next.splice(index + by, 0, moved);
      return next;
    });

  return (
    <form
      className={styles.form}
      action={(formData) =>
        save(() =>
          updateServicesContentAction({
            title: String(formData.get("title") ?? ""),
            lede: String(formData.get("lede") ?? ""),
            items: items.map((item) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              startingAt: Number(item.startingAt),
              includes: item.includes
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean),
            })),
          }),
        )
      }
    >
      <section className={styles.panel}>
        <h2>Heading</h2>
        <p className={styles.hint}>
          Shown above the services on the Services page, and as the heading of the services section on the home page.
        </p>
        <label>
          <span>
            Heading <span className={styles.labelHint}>({TITLE_HINT})</span>
          </span>
          <input name="title" defaultValue={content.title} maxLength={80} required />
        </label>
        <label>
          <span>Intro (Services page only)</span>
          <textarea name="lede" defaultValue={content.lede} rows={3} maxLength={400} required />
        </label>
      </section>

      <ol className={styles.services}>
        {items.map((item, index) => (
          <li key={item.id} className={styles.panel}>
            <div className={styles.serviceHead}>
              <h3>Service {index + 1}</h3>
              <div className={styles.tools}>
                <button
                  type="button"
                  className={styles.outline}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={`Move ${item.title || "service"} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.outline}
                  disabled={index === items.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={`Move ${item.title || "service"} down`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={styles.danger}
                  disabled={items.length === 1}
                  onClick={() => {
                    if (window.confirm(`Remove "${item.title || "this service"}"? It also leaves the contact form's topics once you save.`)) {
                      setItems((current) => current.filter((other) => other.id !== item.id));
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className={styles.row}>
              <label>
                <span>Title</span>
                <input value={item.title} onChange={(event) => update(item.id, { title: event.target.value })} maxLength={80} required />
              </label>
              <label>
                <span>Starting at ($)</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  value={item.startingAt}
                  onChange={(event) => update(item.id, { startingAt: event.target.value })}
                  required
                />
              </label>
            </div>
            <label>
              <span>Description</span>
              <textarea
                value={item.description}
                onChange={(event) => update(item.id, { description: event.target.value })}
                rows={3}
                maxLength={600}
                required
              />
            </label>
            <label>
              <span>
                What&rsquo;s included <span className={styles.labelHint}>(one per line; shown on the Services page)</span>
              </span>
              <textarea value={item.includes} onChange={(event) => update(item.id, { includes: event.target.value })} rows={4} />
            </label>
          </li>
        ))}
      </ol>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.outline}
          disabled={items.length >= MAX_SERVICES}
          onClick={() =>
            setItems((current) => [
              ...current,
              { id: `s${crypto.randomUUID().replaceAll("-", "").slice(0, 10)}`, title: "", description: "", startingAt: "0", includes: "" },
            ])
          }
        >
          + Add a service
        </button>
      </div>

      <SaveBar pending={pending} message={message} />
    </form>
  );
}
