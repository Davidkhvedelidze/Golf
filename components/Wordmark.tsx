export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display ${className}`}>
      <span className="font-normal text-ink">Swing</span>
      <span className="font-bold text-pine">Verdict</span>
    </span>
  );
}
