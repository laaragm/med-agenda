import { twMerge } from 'tailwind-merge';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function TextInput({ name, className, value, placeholder, onChange, ...rest }: TextInputProps) {
  return (
    <input
      name={name}
      type="text"
      className={twMerge('w-full py-2 px-4 text-base text-textPrimary border border-borderColor shadow-sm rounded-3xl focus:outline-none focus:border-textPrimary', className)}
      placeholder={placeholder}
      autoComplete="off"
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}
