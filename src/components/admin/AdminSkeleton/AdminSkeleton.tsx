import styles from "./adminSkeleton.module.scss";

type Variant = "gallery" | "form" | "header";

// Grey blobs shaped like the page that is loading, so the layout doesn't jump when the real content streams in.
export default function AdminSkeleton({ variant }: { variant: Variant }) {
  if (variant === "header") {
    return (
      <div className={styles.header} aria-hidden="true">
        <div className={styles.headerText}>
          <span className={styles.blob} style={{ width: "11rem", height: "2.25rem" }} />
          <span className={styles.blob} style={{ width: "15rem", height: "0.9rem" }} />
        </div>
        <span className={styles.blob} style={{ width: "15rem", height: "2.4rem" }} />
      </div>
    );
  }

  return (
    <div className={styles.page} role="status" aria-label="Loading">
      {variant === "gallery" ? (
        <>
          <div className={styles.pills}>
            {[0, 1, 2].map((item) => (
              <span key={item} className={styles.blob} style={{ width: "7rem", height: "2.4rem", borderRadius: "999px" }} />
            ))}
          </div>
          <div className={styles.panel}>
            <span className={styles.blob} style={{ width: "8rem", height: "1.4rem" }} />
            <span className={styles.blob} style={{ height: "2.4rem" }} />
            <span className={styles.blob} style={{ height: "2.4rem" }} />
            <span className={styles.blob} style={{ height: "6rem" }} />
          </div>
          <div className={styles.grid}>
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <span key={item} className={styles.blob} style={{ height: "17rem", borderRadius: "var(--radius-md)" }} />
            ))}
          </div>
        </>
      ) : (
        [0, 1].map((item) => (
          <div key={item} className={styles.panel}>
            <span className={styles.blob} style={{ width: "8rem", height: "1.4rem" }} />
            <span className={styles.blob} style={{ height: "2.4rem" }} />
            <span className={styles.blob} style={{ height: "5.5rem" }} />
            <span className={styles.blob} style={{ height: "2.4rem" }} />
          </div>
        ))
      )}
    </div>
  );
}
