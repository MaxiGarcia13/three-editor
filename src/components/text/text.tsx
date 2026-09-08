import { cn } from '@maxigarcia/js-utils';

const sizes: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
};

const variants: Record<Variant, string> = {
  default: '',
  muted: 'text-zinc-400',
  heading: 'font-semibold tracking-wide',
  section: 'font-semibold uppercase tracking-wider text-zinc-500',
  error: 'text-red-400',
  numeric: 'tabular-nums leading-none',
};

type Size = 'xs' | 'sm';
type Variant = 'default' | 'muted' | 'heading' | 'section' | 'error' | 'numeric';
type TextElement = 'span' | 'p' | 'h2' | 'div';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: Size;
  variant?: Variant;
}

export function Text({
  as: Component = 'span',
  size = 'xs',
  variant = 'default',
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
