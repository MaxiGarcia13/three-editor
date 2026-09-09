export type AssetStatus = 'ready' | 'error';

export interface AssetEntryProps {
  label: string;
  title?: string;
  /** Secondary line under the name (source file, short error, etc.). */
  description?: string | null;
  /** Full error text for tooltip when description is a short summary. */
  errorDetail?: string | null;
  status?: AssetStatus;
  statusLabel?: string;
  onReplace: () => void;
  onRemove: () => void;
  replaceDisabled?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  /** Leading action (e.g. Retarget) — rendered before Replace / Remove. */
  primaryAction?: React.ReactNode;
  /** When provided, the label can be renamed inline (commit on Enter/blur, cancel on Escape). */
  onRename?: (name: string) => void;
}
