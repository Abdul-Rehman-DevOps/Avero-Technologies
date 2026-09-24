type PlaceholderNoticeProps = {
  title?: string;
  children?: React.ReactNode;
};

export function PlaceholderNotice({
  title = "Content pending",
  children,
}: PlaceholderNoticeProps) {
  return (
    <div
      role="note"
      className="rounded-md border border-dashed border-chalk-200 bg-chalk-100/80 p-5 text-sm text-ink-600"
    >
      <p className="font-mono text-xs tracking-[0.06em] text-ink-400 uppercase">{title}</p>
      <div className="mt-2">{children ?? "Real content will replace this section when available."}</div>
    </div>
  );
}
