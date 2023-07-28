import { Container, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const FriendsIndex: FC = () => {
	const { t } = useTranslation();

	return (
		<>
			<Heading
				color="text.heading"
				fontWeight="medium"
				size="md"
				py={8}
				textTransform="capitalize"
			>
				{t('friends.indexTitle')}
			</Heading>

			<Container maxW="container.lg"></Container>
		</>
	);
};
