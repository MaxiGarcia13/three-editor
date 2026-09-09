import { cn } from '@maxigarcia/js-utils';

const variants: Record<Variant, string> = {
  ghost: 'text-zinc-400 hover:text-white transition-colors',
  default: 'text-zinc-400 hover:text-white transition-colors bg-zinc-700 hover:bg-zinc-600',
  primary: 'text-white bg-sky-500 hover:bg-sky-600',
};

type Variant = 'ghost' | 'default' | 'primary';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: Variant;
}

export function Button({
  className,
  children,
  variant = 'default',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={
        cn(
          'text-xs transition-colors rounded p-2',
          disabled ? 'opacity-50 cursor-not-allowed' : `cursor-pointer ${variants[variant]}`,
          className,
        )
      }
      {...props}
    >
      {children}
    </button>
  );
}
