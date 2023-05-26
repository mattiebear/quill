import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useHttpClient } from '@/lib/http';

export const Profile: FC = () => {
	const http = useHttpClient();

	const { data, isLoading, error } = useQuery(['health'], () => {
		return http.get('http://localhost:3000/ping');
	});

	return (
		<>
			<h1>Profile</h1>
			<h2>
				Data:{' '}
				{isLoading
					? 'Loading...'
					: (error as any)?.message || JSON.stringify(data?.data)}
			</h2>
			<Link to="/">Home</Link>
		</>
	);
};
