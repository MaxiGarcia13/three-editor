import type { UseAssetEntryRenameResult } from '@/components/asset-entry/use-asset-entry-rename';
import { AssetEntryRenameInput } from '@/components/asset-entry/asset-entry-rename-input';
import { Text } from '@/components/text';
import { LibraryModelPreviewButton } from './library-model-preview-button';

interface LibraryModelTitleProps {
  fileName: string;
  rename: UseAssetEntryRenameResult;
  modelId: string;
}

export function LibraryModelTitle({ fileName, modelId, rename }: LibraryModelTitleProps) {
  if (!rename.editing) {
    return (
      <div className="flex items-center justify-between gap-2 w-full min-w-0">
        <Text as="h2" variant="section" className="flex-1 min-w-0 truncate">
          {fileName}
        </Text>

        <LibraryModelPreviewButton modelId={modelId} className="p-1" />
      </div>
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
