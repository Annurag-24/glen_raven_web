import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'warning'
  | 'success'
  | 'error'
  | 'info'
  | 'sky'
  | 'default'
  | 'peach'
  | 'confirmed'
  | 'pending'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'trivant'
  | 'active'
  | 'included';

interface IBadgeProps {
  title: string;
  variant?: BadgeVariant;
  className?: string;
  textClassName?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  warning: 'bg-amber-100 text-amber-800',
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  sky: 'bg-sky-100 text-sky-800',
  default: 'bg-gray-100 text-gray-800',
  peach: 'bg-[#FFEDD5] text-[#9A3412]',
  // Order Status Variants
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  // Custom Variants
  active: 'bg-[#0B6936] text-white',
  trivant: '', // Handled with inline style for gradient
  included: 'bg-[#E0F5FE] text-[#0277BD]',
};

const Badge: React.FC<IBadgeProps> = ({ title, variant = 'default', className, textClassName }) => {
  // Special handling for trivant gradient variant
  const isTrivantGradient = variant === 'trivant';
  const gradientStyle = isTrivantGradient
    ? {
        background: 'linear-gradient(90deg, #D31145 0%, #FF0044 100%)',
      }
    : undefined;

  return (
    <div
      className={cn([
        'px-2.5 py-0.5 rounded-full inline-flex justify-end items-start',
        variantStyles[variant],
        className,
      ])}
      style={gradientStyle}
    >
      <p
        className={cn(
          'justify-center text-xs font-medium leading-4',
          isTrivantGradient && 'text-white',
          textClassName
        )}
      >
        {title}
      </p>
    </div>
  );
};

export default Badge;
