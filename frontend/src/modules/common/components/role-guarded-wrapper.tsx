import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Warning } from 'phosphor-react';

import { useAuth } from '@/common/hooks';
import { UserType } from '@/common/models';

type RoleGuardedWrapperProps = {
	requiredRoles: UserType[];
	fallbackMessage?: string;
	className?: string;
	children: ReactNode;
}

export function RoleGuardedWrapper({ requiredRoles, fallbackMessage, className, children }: RoleGuardedWrapperProps) {
	const { isAuthenticated, user } = useAuth();

	const userHasRole = () => {
		if (isAuthenticated && !!user && user.roles?.length > 0) {
			return requiredRoles.some((role) => user.roles.includes(role));
		}
		return false;
	};

	if (userHasRole()) {
		return <>{children}</>;
	}

	if (fallbackMessage) {
		return (
			<div className={twMerge('bg-orange-100 border-l-4 border-red-500 text-red-700 p-4 flex gap-2', className)} role="alert">
				<Warning size={24} />
				<div className={className}>{fallbackMessage}</div>
			</div>
		);
	}

	return null;
};
