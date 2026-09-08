import { CollapsibleAside } from '@/components/collapsible-aside/collapsible-aside';

export function EditorSettingsSidebar() {
  return (
    <CollapsibleAside title="Settings" direction="right">
      <div className="flex flex-col gap-6">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Settings
        </h2>
      </div>
    </CollapsibleAside>
  );
}
