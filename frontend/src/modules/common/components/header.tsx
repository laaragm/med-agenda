import LogoImg from "@/assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function Header() {
	return (
		<div className="h-[55px] w-full flex items-end justify-between px-5">
			<img src={LogoImg} alt="MedAgenda Logo" height={30} width={200} />

			{/* TODO: Fetch from Graph and sign out */}
			<Popover>
				<PopoverTrigger>
					<Avatar>
						<AvatarImage src="https://github.com/laaragm.png" />
						<AvatarFallback>LG</AvatarFallback>
					</Avatar>
				</PopoverTrigger>
				<PopoverContent>Sair</PopoverContent>
			</Popover>
		</div>
	);
}
