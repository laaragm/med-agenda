import { cn } from "@/common/utils";

interface SpinnerProps {
    className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div className={cn('animate-spin rounded-full h-8 w-8 border-b-2 border-textPrimary', className)}></div>
    </div>
  );
}
