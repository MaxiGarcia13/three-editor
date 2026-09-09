import type { ClipEntry } from '@/modules/animation/types/clip';
import { useMemo, useState } from 'react';
import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { useRetarget } from '@/modules/animation/hooks/use-retarget';
import {
  boneDisplayName,
  boneOptionLabel,
} from '@/modules/animation/services/bone-registry';
import { useActiveModel } from '@/modules/viewport/hooks/use-active-model';
import { retargetClip } from '../stores/clip-store';

interface RetargetPanelProps {
  entry: ClipEntry;
  onComplete: () => void;
  onCancel: () => void;
}

const ROW_GRID
  = 'grid grid-cols-[minmax(7rem,1fr)_1.25rem_minmax(8rem,1.4fr)_4.75rem] gap-x-3 items-center';

export function RetargetPanel({ entry, onComplete, onCancel }: RetargetPanelProps) {
  const { scene } = useActiveModel();
  const {
    sourceBones,
    targetBoneNames,
    mapping,
    mappedCount,
    complete,
    setMapping,
  } = useRetarget(entry, scene);
  const [unmappedOnly, setUnmappedOnly] = useState(false);

  const sortedTargets = useMemo(
    () => [...targetBoneNames].sort((a, b) => {
      const labelCmp = boneDisplayName(a).localeCompare(boneDisplayName(b));
      return labelCmp !== 0 ? labelCmp : a.localeCompare(b);
    }),
    [targetBoneNames],
  );

  if (sourceBones.length === 0) {
    return (
      <Text variant="muted">
        This clip has no bone tracks to map.
      </Text>
    );
  }

  if (targetBoneNames.size === 0) {
    return (
      <Text variant="error">
        The loaded character has no skeleton bones to map onto.
      </Text>
    );
  }

  const rows = unmappedOnly
    ? sourceBones.filter((bone) => {
        const target = mapping.get(bone);
        return !(target && targetBoneNames.has(target));
      })
    : sourceBones;

  const onSubmit = () => {
    const newId = retargetClip(entry.id, mapping);
    if (newId) {
      onComplete();
    }
  };

  const setBoneMapping = (sourceBone: string, value: string) => {
    const next = new Map(mapping);
    if (value) {
      next.set(sourceBone, value);
    } else {
      next.delete(sourceBone);
    }
    setMapping(next);
  };

  const mismatch = entry.error ?? 'Clip tracks do not match this skeleton';

  return (
    <div className="flex flex-col gap-4 min-h-0 flex-1">
      <div className="flex flex-col gap-3 shrink-0">
        <Text as="p" variant="muted">
          Map each clip bone to a character bone. Short names are for reading;
          full ids stay on the tracks. Apply is still required.
        </Text>
        <Text as="p" variant="error" className="break-words">
          Mismatch:
          {' '}
          {mismatch}
        </Text>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Text variant="heading" size="sm" className="shrink-0">
            {mappedCount}
            {' / '}
            {sourceBones.length}
            {' '}
            mapped
          </Text>
          <label className="flex items-center gap-2 cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={unmappedOnly}
              onChange={(event) => setUnmappedOnly(event.target.checked)}
              className="size-3.5 shrink-0 rounded border-zinc-600 accent-sky-500"
            />
            <Text variant="muted">Show unmapped only</Text>
          </label>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto rounded-md border border-zinc-700/80 scrollbar-thin-dark [scrollbar-gutter:stable]">
        <div
          className={`${ROW_GRID} sticky top-0 z-10 bg-zinc-800 px-3 py-2 border-b border-zinc-700`}
        >
          <Text variant="section">Clip bone</Text>
          <span aria-hidden />
          <Text variant="section">Character bone</Text>
          <Text variant="section" className="text-right">
            Status
          </Text>
        </div>

        <div className="flex flex-col px-3 py-2">
          {rows.length === 0
            ? (
                <Text variant="muted" className="py-2">
                  All bones are mapped.
                </Text>
              )
            : rows.map((sourceBone) => {
                const target = mapping.get(sourceBone);
                const isMapped = Boolean(target && targetBoneNames.has(target));
                const sourceLabel = boneDisplayName(sourceBone);
                return (
                  <div
                    key={sourceBone}
                    className={`${ROW_GRID} py-1.5 border-b border-zinc-700/50 last:border-b-0`}
                  >
                    <Text className="truncate" title={sourceBone}>
                      {sourceLabel}
                    </Text>
                    <Text variant="muted" className="text-center" aria-hidden>
                      →
                    </Text>
                    <select
                      value={target ?? ''}
                      onChange={(event) => setBoneMapping(sourceBone, event.target.value)}
                      aria-label={`Map ${sourceLabel} (${sourceBone}) to character bone`}
                      className={
                        `w-full min-w-0 bg-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-100 ${
                          isMapped ? '' : 'ring-1 ring-amber-500/60'
                        }`
                      }
                    >
                      <option value="">— map to —</option>
                      {sortedTargets.map((targetName) => (
                        <option key={targetName} value={targetName}>
                          {boneOptionLabel(targetName, targetBoneNames)}
                        </option>
                      ))}
                    </select>
                    <Text
                      variant={isMapped ? 'muted' : 'error'}
                      className="text-right tabular-nums"
                    >
                      {isMapped ? 'Mapped' : 'Needs map'}
                    </Text>
                  </div>
                );
              })}
        </div>
      </div>

      <div className="flex flex-col gap-2 shrink-0 pt-1">
        {!complete && (
          <Text variant="muted">
            Map every clip bone before applying. Incomplete maps never write a clip.
          </Text>
        )}
        <div className="flex gap-2">
          <Button onClick={onCancel} variant="ghost" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!complete}
            variant="primary"
            className="flex-1"
          >
            Apply Retarget
          </Button>
        </div>
      </div>
    </div>
  );
}
