import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage as SanityImageValue } from "@/sanity/types";

export function SanityImage({
  value,
  width = 800,
  height,
  className,
  priority,
  sizes,
}: {
  value: SanityImageValue | undefined;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!value?.asset) return null;
  const resolvedHeight = height ?? Math.round(width / 1.33);

  return (
    <Image
      className={className}
      src={urlFor(value).width(width).height(resolvedHeight).fit("crop").url()}
      alt={value.alt || ""}
      width={width}
      height={resolvedHeight}
      priority={priority}
      sizes={sizes}
      placeholder={value.asset.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={value.asset.metadata?.lqip}
    />
  );
}
