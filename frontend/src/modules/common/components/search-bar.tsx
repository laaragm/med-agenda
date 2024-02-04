import { useRef } from "react";
import { MagnifyingGlass, Trash } from "phosphor-react";

import { TextInput } from "./text-input";

type SearchBarProps = {
	defaultValue?: string;
	placeholder: string;
	onSearch: (value: string) => void;
	onClear: () => void;
};

export function SearchBar({ defaultValue, placeholder, onSearch, onClear }: SearchBarProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onSearch(inputRef.current?.value || "");
		}
	};

	const handleSearch = () => {
		onSearch(inputRef.current?.value || "")
	}

	const handleClearInput = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
			onClear();
		}
	};

	return (
		<div className="flex flex-row gap-2 items-center">
			<TextInput ref={inputRef} defaultValue={defaultValue} placeholder={placeholder} onKeyDown={handleKeyDown} />
			<MagnifyingGlass size={24} className="cursor-pointer" onClick={handleSearch} />
			<Trash size={24} className="cursor-pointer" onClick={handleClearInput} />
		</div>
	);
}
