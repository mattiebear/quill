import {
	Avatar,
	Button,
	HStack,
	Portal,
	Td,
	Text,
	Tr,
	useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '@clerk/clerk-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmationDialogue } from '@/components/confirmation';
import { useAcceptInvitation } from '@/components/friends/hooks/use-accept-invitation';
import { useRejectInvitation } from '@/components/friends/hooks/use-reject-invitation';
import { Connection } from '@/entites/connection';
import { UserData } from '@/types/user';

interface PendingInvitationsRowProps {
	connection: Connection;
}

export const PendingInvitationsRow: FC<PendingInvitationsRowProps> = ({
	connection,
}) => {
	const { t } = useTranslation();
	const confirmation = useDisclosure();
	const { mutate: acceptInvitation, isLoading: isLoadingAccept } =
		useAcceptInvitation(connection);
	const { mutate: rejectInvitation, isLoading: isLoadingReject } =
		useRejectInvitation(connection);

	// TODO: Refactor this with data entity
	const { user } = useUser();

	const connectedUser = connection.connectionUsers.find(
		(connectionUser) => connectionUser.userId !== user?.id
	) as unknown as UserData;

	return (
		<Tr>
			<Td pl={0}>
				<Avatar src={connectedUser.imageUrl} />
			</Td>
			<Td w="full">
				<Text fontWeight="medium">{connectedUser.username}</Text>
			</Td>
			<Td pr={0}>
				<HStack>
					<Button
						colorScheme="red"
						isDisabled={isLoadingAccept}
						isLoading={isLoadingReject}
						onClick={confirmation.onOpen}
						size="sm"
					>
						{t('friends.pending.reject')}
					</Button>
					<Button
						colorScheme="blue"
						isDisabled={isLoadingReject}
						isLoading={isLoadingAccept}
						onClick={() => acceptInvitation()}
						size="sm"
					>
						{t('friends.pending.accept')}
					</Button>
				</HStack>

				<Portal>
					<ConfirmationDialogue
						title={t('friends.connection.reject.confirmTitle')}
						description={t('friends.connection.reject.confirmDescription')}
						cancelText={t('friends.connection.reject.confirmCancel')}
						acceptText={t('friends.connection.reject.confirmAccept')}
						onAccept={rejectInvitation}
						colorScheme="red"
						isOpen={confirmation.isOpen}
						onClose={confirmation.onClose}
						isLoading={isLoadingReject}
					/>
				</Portal>
			</Td>
		</Tr>
	);
};
