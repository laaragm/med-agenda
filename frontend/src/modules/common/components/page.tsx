import { cn } from '@/common/utils';
interface PageProps {
    centeredContent?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function Page({ centeredContent = false, className, children }: PageProps) {
  return (
    <div className={cn(`flex flex-col ${centeredContent ? 'justify-center' : ''} relative overflow-hidden min-h-[calc(100vh-100px)]`, className)}>
      {children}
    </div>
  );
}
