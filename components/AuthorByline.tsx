import { SanityImage } from "@/components/SanityImage";
import { formatDate } from "@/lib/format";
import type { Author } from "@/sanity/types";

export function AuthorByline({
  author,
  publishedAt,
  updatedAt,
}: {
  author: Author;
  publishedAt: string;
  updatedAt?: string;
}) {
  return (
    <div className="flex items-center gap-3 font-ui text-sm text-ink-soft">
      {author.photo?.asset && (
        <SanityImage
          value={author.photo}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      )}
      <div>
        <p className="text-ink">
          By <span className="font-medium">{author.name}</span>
        </p>
        <p className="text-xs">
          Published {formatDate(publishedAt)}
          {updatedAt && updatedAt !== publishedAt && (
            <> &middot; Last updated {formatDate(updatedAt)}</>
          )}
        </p>
      </div>
    </div>
  );
}
