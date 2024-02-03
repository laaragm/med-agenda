import { twMerge } from 'tailwind-merge';

interface PageProps {
    centeredContent?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function Page({ centeredContent = false, className, children }: PageProps) {
  return (
    <div className={twMerge(`flex flex-col ${centeredContent ? 'justify-center' : ''} relative overflow-hidden min-h-[calc(100vh-55px)]`, className)}>
      {children}
    </div>
  );
}
