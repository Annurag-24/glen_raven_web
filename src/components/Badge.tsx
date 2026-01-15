import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "warning"
  | "success"
  | "error"
  | "info"
  | "sky"
  | "default"
  | "peach";

interface IBadgeProps {
  title: string;
  variant?: BadgeVariant;
  className?: string;
  textClassName?: string;
}

const variantStyles = {
  warning: "bg-amber-100 text-amber-800",
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  sky: "bg-sky-100 text-sky-800",
  default: "bg-gray-100 text-gray-800",
  peach: "bg-[#FFEDD5] text-[#9A3412]",
};

const Badge: React.FC<IBadgeProps> = ({
  title,
  variant = "default",
  className,
  textClassName,
}) => {
  return (
    <div
      className={cn([
        "px-2.5 py-0.5 rounded-full inline-flex justify-end items-start",
        variantStyles[variant],
        className,
      ])}
    >
      <p
        className={cn(
          "justify-center text-xs font-medium leading-4",
          textClassName
        )}
      >
        {title}
      </p>
    </div>
  );
};

export default Badge;
