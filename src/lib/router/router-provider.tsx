import { FC } from 'react'
import { RouterProvider as BaseProvider } from 'react-router-dom';
import { router } from '@/config/routes';

export const RouterProvider: FC = () => {
	return (
		<BaseProvider router={router} />
	)
}
