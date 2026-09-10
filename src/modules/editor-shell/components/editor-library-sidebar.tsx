import { CollapsibleAside } from '@/components/collapsible-aside/collapsible-aside';
import { RetargetModal } from '@/modules/animation/components/retarget-modal';
import { LibraryModels } from './library-models';
import { LibrarySharedAnimations } from './library-shared-animations';

export function EditorLibrarySidebar() {
  return (
    <CollapsibleAside title="Library" direction="left">
      <section className="flex flex-col gap-2">
        <LibraryModels />
        <LibrarySharedAnimations />
      </section>
      <RetargetModal />
    </CollapsibleAside>
  );
}
