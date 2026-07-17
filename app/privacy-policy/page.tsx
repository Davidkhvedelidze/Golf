import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects and uses data.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-semibold text-ink">Privacy Policy</h1>
      <div className="mt-8 space-y-5 font-body text-lg leading-relaxed text-ink">
        <p>
          This policy explains what information {SITE_NAME}
          {" "}
          collects when you visit this site and how it&apos;s used.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink">Analytics</h2>
        <p>
          We use Google Analytics (GA4) to understand which articles are useful and which
          affiliate links readers follow. GA4 collects standard usage data (pages viewed, general
          location, device type) via cookies and similar technologies. We also fire a custom{" "}
          <code>affiliate_click</code>
          {" "}
          event when you click an affiliate link, recording which article, product, and retailer
          were involved &mdash; not any personal information.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink">Affiliate links</h2>
        <p>
          When you click an affiliate link, the retailer (e.g. Amazon, PlayBetter) may set its own
          cookies to track the referral. We don&apos;t control or receive data from those cookies
          beyond commission reporting. See our{" "}
          <Link href="/affiliate-disclosure" className="text-pine underline">
            affiliate disclosure
          </Link>{" "}
          for details.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink">What we don&apos;t do</h2>
        <p>
          We don&apos;t sell personal data, and we don&apos;t require an account or collect contact
          information to read this site.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink">Contact</h2>
        <p>
          Questions about this policy can be sent via the contact details on our About page.
        </p>
      </div>
    </div>
  );
}
