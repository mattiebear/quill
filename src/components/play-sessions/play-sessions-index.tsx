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

import { AddPlaySessionModal } from './add-play-session-modal';

export const PlaySessionsIndex: FC = () => {
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
				{t('playSessions.indexTitle')}
			</Heading>

			<Container maxW="container.lg">
				<VStack spacing={8}>
					<Flex justifyContent="flex-end" w="full">
						<Button colorScheme="blue" onClick={onOpen}>
							{t('playSessions.addSessionButton')}
						</Button>
					</Flex>
				</VStack>
			</Container>

			<AddPlaySessionModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};
