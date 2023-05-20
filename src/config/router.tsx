import { MenuLayout } from '@/components/layout/menu';
import { createBrowserRouter } from 'react-router-dom';
import { Profile } from '@/components/profile';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MenuLayout />,
		children: [
			{
				path: '/',
				element: <div>Home Menu</div>
			},
			{
				path: '/profile',
				element: <Profile />
			}
		]
	}
])
