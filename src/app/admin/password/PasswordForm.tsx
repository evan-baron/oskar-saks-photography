"use client";

import { useActionState } from "react";
import { changePassword } from "./actions";
import styles from "@/app/login/login.module.scss";

export default function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, {});
  return (
    <form action={action} className={styles.form}>
      <label>
        <span>Current password</span>
        <input name="current" type="password" autoComplete="current-password" required />
      </label>
      <label>
        <span>New password</span>
        <input name="next" type="password" autoComplete="new-password" minLength={12} required />
      </label>
      <label>
        <span>Confirm new password</span>
        <input name="confirm" type="password" autoComplete="new-password" minLength={12} required />
      </label>
      {state.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save password"}
      </button>
    </form>
  );
}
