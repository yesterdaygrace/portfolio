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
    <div className="mb-12 reveal-item">
      <div className="flex items-center gap-4 mb-2">
        <span className="font-mono text-sm text-indigo-500">{index}.</span>
        <div className="h-px bg-[#1e1e1e] flex-1"></div>
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-neutral-100 font-sans tracking-tight">
        {title}
      </h2>
      {comment && (
        <p className="font-mono text-xs text-neutral-500 mt-3">/* {comment} */</p>
      )}
    </div>
  );
}
