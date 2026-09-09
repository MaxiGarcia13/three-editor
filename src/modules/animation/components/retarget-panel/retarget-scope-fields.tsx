import type { RetargetScope } from '@/modules/animation/stores/clip-store';

import { Text } from '@/components/text';

interface RetargetScopeFieldsProps {
  scope: RetargetScope;
  multiModel: boolean;
  onScopeChange: (scope: RetargetScope) => void;
}

export function RetargetScopeFields({
  scope,
  multiModel,
  onScopeChange,
}: RetargetScopeFieldsProps) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <Text variant="section">
        Apply to
      </Text>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="radio"
          name="retarget-scope"
          checked={scope === 'active'}
          onChange={() => onScopeChange('active')}
          className="mt-0.5 accent-sky-500"
        />
        <span className="flex flex-col gap-0.5">
          <Text>This model</Text>
          <Text variant="muted">
            New remapped clip for the previewed character; keep the original clip.
          </Text>
        </span>
      </label>
      <label className={`flex items-start gap-2 ${multiModel ? 'cursor-pointer' : 'opacity-50'}`}>
        <input
          type="radio"
          name="retarget-scope"
          checked={scope === 'all'}
          disabled={!multiModel}
          onChange={() => onScopeChange('all')}
          className="mt-0.5 accent-sky-500"
        />
        <span className="flex flex-col gap-0.5">
          <Text>All models</Text>
          <Text variant="muted">
            {multiModel
              ? 'Replace this clip and rename bones on every loaded model to match.'
              : 'Load more than one model to enable.'}
          </Text>
        </span>
      </label>
    </fieldset>
  );
}
