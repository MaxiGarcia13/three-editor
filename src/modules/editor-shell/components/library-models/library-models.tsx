import { useStore } from '@nanostores/react';
import { LibrarySectionCollapsible } from '@/modules/editor-shell/components/library-section-collapsible';
import { $model } from '@/modules/viewport/stores/model-store';
import { ModelImport } from '../model-import';
import { LibraryModel } from './library-model';

export function LibraryModels() {
  const { models } = useStore($model, { keys: ['models'] });

  return (
    <LibrarySectionCollapsible
      title="Models"
      defaultOpen
      actions={<ModelImport />}
    >
      <div className="flex flex-col gap-2">
        {models.map((entry) => (
          <LibraryModel key={entry.id} model={entry} />
        ))}
      </div>
    </LibrarySectionCollapsible>
  );
}
