import Link from "next/link";

export function DisclosureBanner() {
  return (
    <p className="border-y border-line bg-amber-soft/30 px-4 py-2.5 text-center font-ui text-xs text-ink-soft">
      We may earn a commission if you buy through our links. This doesn&apos;t affect our
      recommendations.{" "}
      <Link href="/affiliate-disclosure" className="underline hover:text-pine">
        Learn more
      </Link>
    </p>
  );
}
