import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { cn } from "@/common/utils";
import { CaretDown } from "phosphor-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  	ElementRef<typeof AccordionPrimitive.Item>,
	ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  	ElementRef<typeof AccordionPrimitive.Trigger>,
  	ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex flex-1 items-center justify-between py-4 text-base font-medium transition-all [&[data-state=open]>svg]:rotate-180",
				className
			)}
			{...props}
		>
			{children}
			<CaretDown size={22} className="shrink-0 text-muted-foreground transition-transform duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  	ElementRef<typeof AccordionPrimitive.Content>,
  	ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn("pb-4 pt-0", className)}>{children}</div>
	</AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
