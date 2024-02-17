import LogoImg from "@/assets/logo.svg";
import { signOut } from "@/authentication";
import { useAuth, useProfilePicture } from "@/common/hooks";
import { Avatar, AvatarFallback, AvatarImage, Popover, PopoverContent, PopoverTrigger } from "@/common/components";

export function Header() {
	const { user } = useAuth();
	const { data } = useProfilePicture();

	return (
		<div className="h-[55px] w-full flex items-end justify-between px-5">
			<img src={LogoImg} alt="MedAgenda Logo" height={30} width={200} />

			<Popover>
				<PopoverTrigger>
					<Avatar>
						<AvatarImage src={data} />
						<AvatarFallback className="bg-primary text-white font-semibold">{user?.initials}</AvatarFallback>
					</Avatar>
				</PopoverTrigger>
				<PopoverContent onClick={signOut}>Sair</PopoverContent>
			</Popover>
		</div>
	);
}
