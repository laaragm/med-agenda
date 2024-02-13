
import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/common/utils";

type ScrollAreaProps = {
	className?: string;
	showScrollbarOnHover?: boolean;
	shouldAutoScroll?: boolean;
	autoScrollRef?: any;
	children: ReactNode;
}

export function ScrollArea({ className, showScrollbarOnHover = false, shouldAutoScroll = false, autoScrollRef, children }: ScrollAreaProps) {
	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (shouldAutoScroll && divRef?.current) {
			divRef.current.scrollTop = divRef.current.scrollHeight;
		}
	}, [autoScrollRef]);

	const baseClassName = "scrollbar scrollbar-thumb-rounded scrollbar-w-[3px] scrollbar-h-[3px]";
	const baseScrollbarClassName = showScrollbarOnHover
		? `${baseClassName} hover:scrollbar-thumb-gray-300 hover:scrollbar-track-gray-100`
		: `${baseClassName} scrollbar-thumb-gray-300 scrollbar-track-gray-100`;

	return (
		<div ref={divRef} className={cn(baseScrollbarClassName, className)}>
			{children}
		</div>
	);
}
