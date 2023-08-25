import {
	Button,
	Container,
	Flex,
	Heading,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AddGameSessionModal } from './add-game-session-modal';
import { GameSessionsTable } from './game-sessions-table';

export const GameSessionsIndex: FC = () => {
	const { t } = useTranslation();
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<Heading
				color="text.heading"
				fontWeight="medium"
				size="md"
				py={8}
				textTransform="capitalize"
			>
				{t('gameSessions.indexTitle')}
			</Heading>

			<Container maxW="container.lg">
				<VStack spacing={8}>
					<Flex justifyContent="flex-end" w="full">
						<Button colorScheme="blue" onClick={onOpen}>
							{t('gameSessions.addSessionButton')}
						</Button>
					</Flex>

					<GameSessionsTable />
				</VStack>
			</Container>

			<AddGameSessionModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};
