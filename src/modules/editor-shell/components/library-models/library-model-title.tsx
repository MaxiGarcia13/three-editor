import type { UseAssetEntryRenameResult } from '@/components/asset-entry/use-asset-entry-rename';
import { AssetEntryRenameInput } from '@/components/asset-entry/asset-entry-rename-input';
import { Text } from '@/components/text';

interface LibraryModelTitleProps {
  fileName: string;
  rename: UseAssetEntryRenameResult;
}

export function LibraryModelTitle({ fileName, rename }: LibraryModelTitleProps) {
  if (!rename.editing) {
    return (
      <Text as="h2" variant="section" className="flex-1 min-w-0 truncate">
        {fileName}
      </Text>
    );
  }

  return (
    <div className="flex-1 min-w-0" onClick={(event) => event.stopPropagation()}>
      <AssetEntryRenameInput
        inputRef={rename.inputRef}
        value={rename.draft}
        onChange={rename.setDraft}
        onCommit={rename.commit}
        onCancel={rename.cancel}
      />
    </div>
  );
}
