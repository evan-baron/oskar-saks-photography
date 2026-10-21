"use client";

import { useActionState } from "react";
import { login } from "./actions";
import styles from "./login.module.scss";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className={styles.form}>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label>
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
