import styles from "./contentEditor.module.scss";

export default function SaveBar({ pending, message }: { pending: boolean; message: { text: string; error: boolean } | null }) {
  return (
    <div className={styles.actions}>
      <button type="submit" className={styles.primary} disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </button>
      {message && (
        <p className={message.error ? styles.error : styles.ok} role="status">
          {message.text}
        </p>
      )}
    </div>
  );
}
