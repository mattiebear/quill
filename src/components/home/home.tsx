import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export const Home: FC = () => {
	return <>
		<h1>Home</h1>

		<SignedIn>
			<Link to="/profile">Profile</Link>
		</SignedIn>

		<SignedOut>
			<Link to="/sign-in">Sign In</Link>
		</SignedOut>
	</>
}
