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
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveConnectionsTable } from '@/components/friends/active-connections-table';
import { AddFriendModal } from '@/components/friends/add-friend-modal';
import { FriendsContext } from '@/components/friends/context';
import { useConnections } from '@/components/friends/hooks/use-connections';
import { PendingInvitationsTable } from '@/components/friends/pending-invitations-table';
import { MagnifyingGlassIcon } from '@/components/icon';

export const FriendsIndex: FC = () => {
	const { t } = useTranslation();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { acceptedConnections, pendingConnections } = useConnections();
	const [searchValue, setSearchValue] = useState('');

	const count = acceptedConnections.length + pendingConnections.length;
	const canSearch = !!count;

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
				<VStack spacing={8}>
					<VStack alignItems="flex-end" spacing={4} w="full">
						<Flex justifyContent="flex-end">
							<Button colorScheme="blue" onClick={onOpen}>
								{t('friends.addFriendButton')}
							</Button>
						</Flex>

						{canSearch && (
							<InputGroup color="text.form.input">
								<Input
									onChange={(e) => setSearchValue(e.target.value)}
									placeholder={t('common.search')}
									value={searchValue}
								/>
								<InputRightElement>
									<MagnifyingGlassIcon boxSize={6} />
								</InputRightElement>
							</InputGroup>
						)}
					</VStack>

					<FriendsContext value={{ searchValue }}>
						<PendingInvitationsTable />
						<ActiveConnectionsTable />
					</FriendsContext>
				</VStack>
			</Container>

			<AddFriendModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};
