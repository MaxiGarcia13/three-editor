import { cn } from '@maxigarcia/js-utils';

const variants: Record<Variant, string> = {
  ghost: 'text-zinc-400 hover:text-white transition-colors',
  default: 'text-zinc-400 hover:text-white transition-colors bg-zinc-700 hover:bg-zinc-800',
};

type Variant = 'ghost' | 'default';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: Variant;
}

export function Button({ className, children, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={
        cn(
          'transition-colors cursor-pointer rounded p-2',
          variants[variant],
          className,
        )
      }
      {...props}
    >
      {children}
    </button>
  );
}
