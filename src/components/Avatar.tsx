"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  initials: string;
  size?: number;
}

export default function Avatar({ src, alt, initials, size = 64 }: AvatarProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      className="relative shrink-0 overflow-hidden rounded-full border border-border bg-cream shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
    >
      {!errored ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover [filter:grayscale(1)_sepia(0.35)_contrast(0.95)_brightness(1.02)]"
          onError={() => setErrored(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-cormorant text-lg font-medium text-brick/60"
        >
          {initials}
        </span>
      )}
    </div>
  );
}
