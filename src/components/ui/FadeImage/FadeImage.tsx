"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import styles from "./fadeImage.module.scss";

export default function FadeImage({ className = "", onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={props.alt}
      ref={(node) => {
        if (node?.complete && node.naturalWidth > 0) setLoaded(true);
      }}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      className={`${styles.fade} ${loaded ? styles.loaded : ""} ${className}`}
    />
  );
}
