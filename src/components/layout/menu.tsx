import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react'

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
	)
}
