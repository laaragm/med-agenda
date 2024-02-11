import { cn } from "@/common/utils";
import { Spinner } from "@/common/components";

type Variant =
	"contained-primary"
	| "contained-secondary"
	| "contained-tertiary"
	| "contained-danger"
	| "outlined-primary"
	| "outlined-secondary"
	| "outlined-tertiary"
	| "outlined-danger"
	| "text"
	| "icon";

type Size = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    loading?: boolean;
    variant?: Variant;
	size?: Size;
}

const variants: { [key in Variant]: string } = {
	"contained-primary": "bg-primary text-white border-primary",
	"contained-secondary": "bg-secondary text-white border-secondary",
	"contained-tertiary": "bg-tertiary text-white border-tertiary",
	"contained-danger": "bg-danger text-white border-danger",
	"outlined-primary": "bg-white text-primary border border-primary",
	"outlined-secondary": "bg-white text-secondary border border-secondary",
	"outlined-tertiary": "bg-white text-tertiary border border-tertiary",
	"outlined-danger": "bg-white text-danger border border-danger",
	text: "bg-white text-textPrimary p-2",
	icon: "border-none p-2 h-auto rounded-full hover:bg-gray-100",
};

const sizes: { [key in Size]: string } = {
    small: "px-2 py-0 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
};

const loadingSizes: { [key in Size]: string } = {
	small: "h-2 w-2",
	medium: "h-4 w-4",
	large: "h-6 w-6"
};

export function Button({ text, disabled, className, children, loading = false, variant = "contained-primary", size = "medium", type = "button", ...rest }: ButtonProps) {
	return (
		<button
			type={type}
			className={cn(`flex flex-row items-center justify-center gap-2 w-full font-semibold rounded-lg	disabled:opacity-50 ${variants[variant]} ${sizes[size]}`, className)}
			disabled={disabled || loading}
			{...rest}
		>
			{text}
			{children}
			{loading && <Spinner className={`${loadingSizes[size]} border-current`} />}
		</button>
	);
}
