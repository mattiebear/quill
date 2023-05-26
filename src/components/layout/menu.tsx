import { UserButton } from '@clerk/clerk-react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MenuLayout: FC = () => {
	return (
		<div>
			<nav>
				<UserButton />
			</nav>

			<main>
				<Outlet />
			</main>
		</div>
	);
};
