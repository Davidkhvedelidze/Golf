import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  tags?: string[];
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body?.tags || body.tags.length === 0) {
      return new Response("Missing tags", { status: 400 });
    }

    // { expire: 0 } forces immediate cache expiry so the webhook's change is
    // live on the very next request. "max" would only mark tags stale for
    // background stale-while-revalidate, which doesn't fit a Studio publish.
    body.tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));

    return NextResponse.json({ revalidated: true, tags: body.tags, now: Date.now() });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
