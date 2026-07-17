export default function SectionHeader({
  index,
  title,
  comment,
}: {
  index: string;
  title: string;
  comment?: string;
}) {
  return (
    <div className="mb-16 reveal-item">
      <span className="eyebrow">[ {index} ] — {comment ?? title}</span>
    </div>
  );
}
