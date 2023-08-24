import {
	Avatar,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Portal,
	Td,
	Text,
	Tr,
	useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmationDialogue } from '@/components/confirmation';
import { useRemoveConnection } from '@/components/friends/hooks/use-remove-connection';
import { EllipsisHorizontalIcon, UserMinusIcon } from '@/components/icon';
import { Connection } from '@/entites/connection';
import { useCurrentUser } from '@/lib/auth/use-current-user';

interface ActiveConnectionsRowProps {
	connection: Connection;
}

export const ActiveConnectionsRow: FC<ActiveConnectionsRowProps> = ({
	connection,
}) => {
	const { t } = useTranslation();
	const confirmation = useDisclosure();
	const { mutate, isLoading } = useRemoveConnection(connection);
	const user = useCurrentUser();
	const connectedUser = connection.other(user);

	return (
		<Tr>
			<Td pl={0}>
				<Avatar name={connectedUser.username} src={connectedUser.imageUrl} />
			</Td>
			<Td w="full">
				<Text fontWeight="medium">{connectedUser.username}</Text>
			</Td>
			<Td pr={0}>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label={t('friends.active.menuLabel', {
							username: connectedUser.username,
						})}
						colorScheme="cyan"
						icon={<EllipsisHorizontalIcon />}
						isRound
						size="sm"
						variant="outline"
						_hover={{
							bg: 'blue.900',
						}}
					/>

					<MenuList bg="background.cover">
						<MenuItem
							bg="background.cover"
							icon={<UserMinusIcon boxSize={5} />}
							onClick={confirmation.onOpen}
							_hover={{ bg: 'background.float' }}
						>
							{t('friends.active.menuRemove')}
						</MenuItem>
					</MenuList>
				</Menu>

				<Portal>
					<ConfirmationDialogue
						title={t('friends.connection.remove.confirmTitle')}
						description={t('friends.connection.remove.confirmDescription')}
						cancelText={t('friends.connection.remove.confirmCancel')}
						acceptText={t('friends.connection.remove.confirmAccept')}
						onAccept={mutate}
						colorScheme="red"
						isOpen={confirmation.isOpen}
						onClose={confirmation.onClose}
						isLoading={isLoading}
					/>
				</Portal>
			</Td>
		</Tr>
	);
};
