import { FC } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'

export const Profile: FC = () => {
	const { data, isLoading, error } = useQuery(['health'], () =>{
		return axios.get('http://localhost:3000/health')
	})

	return <>
		<h1>Profile</h1>
		<h2>Data: {isLoading ? 'Loading...' : (error as any).message || JSON.stringify(data)}</h2>
		<Link to="/">Home</Link>
	</>
}
