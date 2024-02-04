import { cn } from "@/common/utils";

type BadgeProps = {
	text: string;
	variant?: Variant;
	className?: string;
}

type Variant = "primary" | "danger" | "warning" | "success";

const variants: { [key in Variant]: string } = {
	primary: "bg-primary text-textPrimary",
	danger: "bg-danger/10 text-danger",
	warning: "bg-warning/20 text-warning",
	success: "bg-secondary/10 text-secondary",
};

export function Badge({ text, className, variant = "primary" }: BadgeProps) {
    const variantClasses = variants[variant];

    return (
        <span className={cn(`inline-flex p-1 mb-1 mr-1 ${variantClasses} rounded-md text-xs font-bold`, className)}>
			{text}
        </span>
    );
}
