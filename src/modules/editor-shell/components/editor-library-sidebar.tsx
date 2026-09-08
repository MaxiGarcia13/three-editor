import { CollapsibleAside } from '@/components/collapsible-aside/collapsible-aside';
import { Text } from '@/components/text';
import { ClipImport } from '@/modules/animation/components/clip-import';
import { ClipLibrary } from '@/modules/animation/components/clip-library';
import { DownloadExport } from './download-export';
import { ModelLibrary } from './model-library';

export function EditorLibrarySidebar() {
  return (
    <CollapsibleAside title="Library" direction="left">
      <section className="flex flex-col gap-2">
        <Text as="h2" variant="section">
          Model
        </Text>
        <ModelLibrary />
      </section>

      <section className="flex flex-col gap-3">
        <Text as="h2" variant="section">
          Animations
        </Text>

        <ClipImport />

        <ClipLibrary />
      </section>

      <section className="flex flex-col gap-3">
        <Text as="h2" variant="section">
          Export
        </Text>
        <DownloadExport />
      </section>
    </CollapsibleAside>
  );
}
