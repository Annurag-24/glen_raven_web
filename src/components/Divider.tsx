import { cn } from "@/lib/utils";

interface IDividerProps {
  className?: string;
}

const Divider: React.FC<IDividerProps> = ({ className }) => {
  return (
    <div className={cn("w-full h-[0.50px] bg-neutral-400/25", className)} />
  );
};

export default Divider;
