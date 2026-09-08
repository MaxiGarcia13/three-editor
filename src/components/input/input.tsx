import { cn } from '@maxigarcia/js-utils';
import { Text } from '@/components/text';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="flex flex-1 flex-col gap-1">
      <Text variant="muted">{label}</Text>
      <input
        className={
          cn(
            'bg-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-100 disabled:opacity-50',
            className,
          )
        }
        {...props}
      />
    </label>
  );
}
