import { CollapsibleAside } from '@/components/collapsible-aside/collapsible-aside';
import { ClipImport } from '@/modules/animation/components/clip-import';
import { ClipLibrary } from '@/modules/animation/components/clip-library';
import { ModelLibrary } from './model-library';

export function EditorLibrarySidebar() {
  return (
    <CollapsibleAside title="Library" direction="left">
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Model
        </h2>
        <ModelLibrary />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Animations
        </h2>

        <ClipImport />

        <ClipLibrary />
      </section>
    </CollapsibleAside>
  );
}
