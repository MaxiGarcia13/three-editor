import { CollapsibleAside } from '@/components/collapsible-aside/collapsible-aside';
import { ClipTrimInputs, SpeedControl } from '@/modules/animation';

export function EditorSettingsSidebar() {
  return (
    <CollapsibleAside title="Settings" direction="right">
      <div className="flex flex-col gap-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Animation
        </h2>

        <div className="flex flex-col gap-2">
          <ClipTrimInputs />
          <SpeedControl />
        </div>
      </div>
    </CollapsibleAside>
  );
}
