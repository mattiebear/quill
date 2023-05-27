import { Heading } from '@chakra-ui/react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@/components/link';

export const Home: FC = () => {
	const { t } = useTranslation();

	return null;

	return (
		<>
			<Heading color="primary">{t('home')}</Heading>

			<SignedIn>
				<Link color="text.body" to="/profile">
					Profile
				</Link>
			</SignedIn>

			<SignedOut>
				<Link color="text.body" to="/sign-in">
					Sign In
				</Link>
			</SignedOut>
		</>
	);
};
