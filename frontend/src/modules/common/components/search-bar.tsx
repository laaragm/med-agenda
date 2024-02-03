import { useRef } from "react";
import { MagnifyingGlass } from "phosphor-react";

import { TextInput } from "./text-input";

type SearchBarProps = {
	defaultValue?: string;
	placeholder: string;
	onSearch: (value: string) => void;
};

export function SearchBar({ defaultValue, placeholder, onSearch }: SearchBarProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onSearch(inputRef.current?.value || '');
		}
	};

	return (
		<div className="flex flex-row gap-1 items-center">
			<TextInput ref={inputRef} defaultValue={defaultValue} placeholder={placeholder} onKeyDown={handleKeyDown} />
			<MagnifyingGlass size={32} className="cursor-pointer" onClick={() => onSearch(inputRef.current?.value || '')} />
		</div>
	);
}
