export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="my-8 grid gap-px overflow-hidden border border-line sm:grid-cols-2">
      <div className="bg-paper p-5">
        <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wide text-pine">
          Pros
        </p>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex gap-2 text-[0.95rem] leading-snug">
              <span aria-hidden="true" className="text-pine">
                +
              </span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-line bg-paper p-5 sm:border-t-0 sm:border-l">
        <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wide text-brick">
          Cons
        </p>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex gap-2 text-[0.95rem] leading-snug">
              <span aria-hidden="true" className="text-brick">
                &minus;
              </span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
