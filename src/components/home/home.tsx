import { Heading } from '@chakra-ui/react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Home: FC = () => {
	return (
		<>
			<Heading color="primary">Home</Heading>

			<SignedIn>
				<Link to="/profile">Profile</Link>
			</SignedIn>

			<SignedOut>
				<Link to="/sign-in">Sign In</Link>
			</SignedOut>
		</>
	);
};
