import type { Product } from "@/sanity/types";

export interface CostBreakdown {
  dayOne: number;
  hasSubscription: boolean;
  subscriptionRequired: boolean;
  subscriptionName?: string;
  pricePerYear: number;
  trialDays: number;
  /** Set only when the subscription is required for full features. */
  yearOneRequired?: number;
  /** Set only when the subscription is optional — cost without it. */
  yearOneWithout?: number;
  /** Set only when the subscription is optional — cost with it. */
  yearOneWith?: number;
}

/**
 * A subscription object with pricePerYear: 0 (e.g. "None required") isn't a
 * real ongoing cost, so it's treated the same as no subscription at all
 * rather than showing a redundant "$0/yr optional" line.
 */
export function computeCost(product: Product): CostBreakdown {
  const sub = product.subscription;
  const pricePerYear = sub?.pricePerYear ?? 0;
  const hasSubscription = Boolean(sub) && pricePerYear > 0;

  if (!hasSubscription) {
    return {
      dayOne: product.priceUSD,
      hasSubscription: false,
      subscriptionRequired: false,
      pricePerYear: 0,
      trialDays: 0,
    };
  }

  const trialDays = sub?.trialDays ?? 0;
  const subscriptionName = sub?.name;

  if (sub?.required) {
    return {
      dayOne: product.priceUSD,
      hasSubscription: true,
      subscriptionRequired: true,
      subscriptionName,
      pricePerYear,
      trialDays,
      yearOneRequired: product.priceUSD + pricePerYear,
    };
  }

  return {
    dayOne: product.priceUSD,
    hasSubscription: true,
    subscriptionRequired: false,
    subscriptionName,
    pricePerYear,
    trialDays,
    yearOneWithout: product.priceUSD,
    yearOneWith: product.priceUSD + pricePerYear,
  };
}
