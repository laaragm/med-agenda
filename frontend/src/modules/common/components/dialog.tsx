import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from "react";
import { X } from "phosphor-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/common/utils";

interface DialogProps {
	trigger?: ReactNode;
	title?: string;
	description?: string;
	className?: string;
	isOpen: boolean;
	position?: "center" | "left" | "right";
	onOpenChange: (open: boolean) => void;
	children?: ReactNode;
  }

export function Dialog({ isOpen, onOpenChange, title, description, className, position = "center", children }: DialogProps) {
	const positionStyles = {
		center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
		left: "top-0 left-0 translate-x-0 translate-y-0 h-full",
		right: "top-0 right-0 translate-x-0 translate-y-0 h-full",
	};

	return (
	  	<DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
			<DialogPrimitive.Portal>
		  		<DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
				  	<DialogPrimitive.Content
						className={cn(`fixed w-[85vw] bg-white p-6 rounded-md border border-solid border-borderColor z-20 ${positionStyles[position] || positionStyles.center} `, className)}
		  			>
						{!!title && (
							<DialogPrimitive.Title className="text-textPrimary m-0 text-lg font-medium">
								{title}
							</DialogPrimitive.Title>
						)}
						{!!description && (
							<DialogPrimitive.Description className="text-textPrimary mt-2 mb-5 text-base">
								{description}
							</DialogPrimitive.Description>
						)}
						<DialogPrimitive.Close asChild className="mb-5">
							<button
								className="text-textPrimary absolute top-2 right-2 inline-flex appearance-none outline-none items-center justify-center rounded-full py-1"
								aria-label="Close"
							>
								<X size={20} />
							</button>
						</DialogPrimitive.Close>
						{!!children && <>{children}</>}
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
};
