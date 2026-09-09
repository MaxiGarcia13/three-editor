import { Text } from '@/components/text';

interface LibrarySectionHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function LibrarySectionHeader({ title, action }: LibrarySectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 min-h-7">
      <Text as="h2" variant="section">
        {title}
      </Text>
      {action}
    </div>
  );
}
