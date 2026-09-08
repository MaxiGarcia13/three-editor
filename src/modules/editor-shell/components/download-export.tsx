import { Button } from '@/components/button';
import { DownloadIcon } from '@/components/icons/download-icon';
import { Text } from '@/components/text';
import { useExportZip } from '@/modules/export';

export function DownloadExport() {
  const { download, busy, error, canExport } = useExportZip();

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => void download()}
        disabled={!canExport || busy}
        className="flex items-center gap-2 w-full justify-center"
      >
        <DownloadIcon />
        {busy ? 'Packing…' : 'Download'}
      </Button>
      {error && (
        <Text as="div" variant="error" className="whitespace-pre-line">
          {error}
        </Text>
      )}
    </div>
  );
}
