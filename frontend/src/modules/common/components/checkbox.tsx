import { forwardRef } from "react";
import { cn } from "@/common/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  tooltipText?: string;
  scale?: Size;
}

type Size = "small" | "medium" | "large";

const sizeClasses: { [key in Size]: string } = {
	small: 'h-4 w-4 text-sm mt-0.5',
	medium: 'h-5 w-5 text-base mt-[3px]',
	large: 'h-6 w-6 text-lg mt-[3px]',
};

const labelSizeClasses: { [key in Size]: string } = {
	small: 'text-sm',
	medium: 'text-base',
	large: 'text-lg',
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
	id,
	className,
	labelClassName,
	checked,
	label,
	tooltipText,
	scale = "medium",
	disabled = false,
	onChange,
	...rest
}, ref) => {
  return (
    <div className="flex flex-row items-start">
      <input
        id={id}
        type="checkbox"
		ref={ref}
        className={cn(`mr-1.5 ${sizeClasses[scale]} accent-primary`, className)}
        disabled={disabled}
		{...(checked !== undefined ? { checked } : {})}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={id} className={cn(`${labelSizeClasses[scale]}`, labelClassName)}>{label}</label>
    </div>
  );
});
