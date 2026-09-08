import { CollapsibleAside } from '@/components/collapsible-aside/collapsible-aside';
import { Text } from '@/components/text';
import { ClipTrimInputs, SpeedControl } from '@/modules/animation';

export function EditorSettingsSidebar() {
  return (
    <CollapsibleAside title="Settings" direction="right">
      <div className="flex flex-col gap-6">
        <Text as="h2" variant="section">
          Animation
        </Text>

        <div className="flex flex-col gap-2">
          <ClipTrimInputs />
          <SpeedControl />
        </div>
      </div>
    </CollapsibleAside>
  );
}
