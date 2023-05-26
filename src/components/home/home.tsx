import { Heading } from '@chakra-ui/react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Home: FC = () => {
	const { t } = useTranslation();

	return (
		<>
			<Heading color="primary">{t('home')}</Heading>

			<SignedIn>
				<Link to="/profile">Profile</Link>
			</SignedIn>

			<SignedOut>
				<Link to="/sign-in">Sign In</Link>
			</SignedOut>
		</>
	);
};
