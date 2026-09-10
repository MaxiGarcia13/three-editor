import { useStore } from '@nanostores/react';
import { ClipImport } from '@/modules/animation/components/clip-import';
import { ClipNewAnimation } from '@/modules/animation/components/clip-new-animation';
import { ClipRows } from '@/modules/animation/components/clip-rows';
import { $clips } from '@/modules/animation/stores/clip-store';
import { LibrarySectionCollapsible } from '@/modules/editor-shell/components/library-section-collapsible';

export function LibrarySharedAnimations() {
  const { clips } = useStore($clips, { keys: ['clips'] });
  const sharedClips = clips.filter((entry) => entry.ownerModelId === null);

  return (
    <LibrarySectionCollapsible
      title="Shared Animations"
      defaultOpen
      actions={(
        <>
          <ClipNewAnimation />
          <ClipImport />
        </>
      )}
    >
      <ClipRows clips={sharedClips} />
    </LibrarySectionCollapsible>
  );
}
