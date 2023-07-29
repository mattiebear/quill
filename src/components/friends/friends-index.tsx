import {
	Button,
	Container,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AddFriendModal } from '@/components/friends/add-friend-modal';
import { MagnifyingGlassIcon } from '@/components/icon';

export const FriendsIndex: FC = () => {
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
				{t('friends.indexTitle')}
			</Heading>

			<Container maxW="container.lg">
				<VStack alignItems="flex-end" spacing={4}>
					<Flex justifyContent="flex-end">
						<Button colorScheme="blue" onClick={onOpen}>
							{t('friends.addFriendButton')}
						</Button>
					</Flex>

					<InputGroup color="text.form.input">
						<Input placeholder={t('common.search')} />
						<InputRightElement>
							<MagnifyingGlassIcon boxSize={6} />
						</InputRightElement>
					</InputGroup>
				</VStack>
			</Container>

			<AddFriendModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};
