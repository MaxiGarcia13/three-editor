interface AssetEntryRenameInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onCommit: () => void;
  onCancel: () => void;
}

export function AssetEntryRenameInput({
  inputRef,
  value,
  onChange,
  onCommit,
  onCancel,
}: AssetEntryRenameInputProps) {
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      onBlur={onCommit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onCommit();
        } else if (event.key === 'Escape') {
          onCancel();
        }
      }}
      aria-label="Rename"
      className="w-full min-w-0 rounded-sm bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-100"
    />
  );
}
