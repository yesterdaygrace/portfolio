/**
 * GSAPReveal — structural wrapper only.
 * In fixed-panel mode, App.tsx owns all scroll animations.
 * This component simply provides the container reference so
 * `.reveal-item` descendants are discoverable by the panel setup.
 */
export default function GSAPReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}
