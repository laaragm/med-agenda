import { twMerge } from 'tailwind-merge';

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

export function Checkbox({
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
}: CheckboxProps) {
  return (
    <div className="flex flex-row items-start">
      <input
        id={id}
        type="checkbox"
        className={twMerge(`mr-1.5 ${sizeClasses[scale]} accent-primary`, className)}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={id} className={twMerge(`${labelSizeClasses[scale]}`, labelClassName)}>{label}</label>
    </div>
  );
}
