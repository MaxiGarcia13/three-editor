import { CollapsibleAside } from '@/components/collapsible-aside/collapsible-aside';
import { ClipImport, ClipImportHint } from '@/modules/animation/components/clip-import';
import { ClipLibrary } from '@/modules/animation/components/clip-library';
import { LibrarySectionHeader } from './library-section-header';
import { ModelImport } from './model-import';
import { ModelLibrary } from './model-library';

export function EditorLibrarySidebar() {
  return (
    <CollapsibleAside title="Library" direction="left">
      <section className="flex flex-col gap-2">
        <LibrarySectionHeader title="Model" action={<ModelImport />} />
        <ModelLibrary />
      </section>

      <section className="flex flex-col gap-3">
        <LibrarySectionHeader title="Animations" action={<ClipImport />} />
        <ClipImportHint />
        <ClipLibrary />
      </section>
    </CollapsibleAside>
  );
}
