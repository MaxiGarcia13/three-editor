import { CollapsibleAside } from '@/components/collapsible-aside/collapsible-aside';
import { Text } from '@/components/text';
import { ClipTrimInputs, SpeedControl } from '@/modules/animation';
import { DownloadExport } from './download-export';

export function EditorSettingsSidebar() {
  return (
    <CollapsibleAside title="Settings" direction="right" className="flex flex-col gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <Text as="h2" variant="section">
          Animation
        </Text>

        <div className="flex flex-col gap-2">
          <ClipTrimInputs />
          <SpeedControl />
        </div>
      </div>
      <footer className="flex flex-col gap-3">
        <Text as="h2" variant="section">
          Export
        </Text>
        <DownloadExport />
      </footer>
    </CollapsibleAside>
  );
}
