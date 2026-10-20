"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "./reveal.module.scss";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  style: extraStyle,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = { ...extraStyle, "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <Tag
      ref={ref}
      style={style}
      className={`${styles.reveal} ${inView ? styles.visible : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
