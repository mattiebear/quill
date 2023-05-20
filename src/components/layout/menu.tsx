import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MenuLayout: FC = () => {
	return (
		<div>

		<nav>
			Navbar
		</nav>

		<main>
			<Outlet />
			</main>
		</div>
	)
}
