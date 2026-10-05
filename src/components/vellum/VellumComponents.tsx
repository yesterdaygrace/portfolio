import React from "react";

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
          style={{ color: "var(--c-accent)" }}
        >
          {secondaryNote}
        </div>
      )}
    </aside>
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

