import React from "react";

export interface ChapterHeaderProps {
  number: string;
  title: string;
  category?: string;
  className?: string;
}

export function ChapterHeader({
  number,
  title,
  category,
  className = "",
}: ChapterHeaderProps) {
  return (
    <header
      className={`flex items-baseline justify-between border-b pb-3 mb-12 sm:mb-16 ${className}`}
      style={{ borderColor: "var(--c-border)" }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono text-xs uppercase tracking-widest font-medium"
          style={{ color: "var(--c-accent)" }}
        >
          [{number}]
        </span>
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--c-fg-2)" }}
        >
          {title}
        </span>
      </div>
      {category && (
        <span
          className="font-mono text-[11px] uppercase tracking-wider hidden sm:inline"
          style={{ color: "var(--c-accent)" }}
        >
          {category}
        </span>
      )}
    </header>
  );
}

export interface PinAnnotationProps {
  counter?: string;
  note: string;
  secondaryNote?: string;
  className?: string;
}

export function PinAnnotation({
  counter,
  note,
  secondaryNote,
  className = "",
}: PinAnnotationProps) {
  return (
    <aside
      aria-label="Chapter annotation"
      className={`font-mono text-xs leading-relaxed max-w-sm ${className}`}
      style={{ color: "var(--c-accent)" }}
    >
      {counter && (
        <div className="font-semibold tracking-wider mb-1 text-[11px]">
          {counter}
        </div>
      )}
      <div className="tracking-wide">{note}</div>
      {secondaryNote && (
        <div
          className="mt-0.5 text-[11px] tracking-wide"
          style={{ color: "rgba(58, 120, 120, 0.85)" }}
        >
          {secondaryNote}
        </div>
      )}
    </aside>
  );
}

export function Kicker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-widest block mb-3 ${className}`}
      style={{ color: "var(--c-accent)" }}
    >
      {children}
    </span>
  );
}

export function AccentRule({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block my-5 ${className}`}
      style={{
        width: "28px",
        height: "1px",
        backgroundColor: "var(--c-accent)",
      }}
    />
  );
}

export function Hairline({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full my-6 ${className}`}
      style={{ height: "1px", backgroundColor: "var(--c-border)" }}
    />
  );
}

export function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`font-display italic leading-none select-none ${className}`}
      style={{
        fontSize: "clamp(3.5rem, 6vw, 6rem)",
        color: "var(--c-accent)",
      }}
    >
      “
    </div>
  );
}
