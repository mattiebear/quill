import {
	Avatar,
	AvatarGroup,
	Button,
	HStack,
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
import { Link } from 'react-router-dom';

import { GameSession } from '@/entites/game-session';

import { ConfirmationDialogue } from '../confirmation';
import { EllipsisHorizontalIcon, TrashIcon } from '../icon';
import { useCompleteGameSession } from './hooks/use-complete-game-session';
import { useGameSessionRow } from './hooks/use-game-session-row';
import { useRemoveGameSession } from './hooks/use-remove-game-session';
import { StatusTag } from './status-tag';

interface GameSessionsRowProps {
	session: GameSession;
}

export const GameSessionRow: FC<GameSessionsRowProps> = ({ session }) => {
	const { t } = useTranslation();
	const { name, path, isEditable, isCompletable } = useGameSessionRow(session);
	const completeConfirm = useDisclosure();
	const completeRequest = useCompleteGameSession(session);
	const removeConfirm = useDisclosure();
	const removeRequest = useRemoveGameSession(session);

	const isAnyLoading = completeRequest.isLoading || removeRequest.isLoading;

	return (
		<Tr>
			<Td pl={0}>
				<AvatarGroup>
					{session.players.map(({ user }) => (
						<Avatar id={user.id} name={user.username} src={user.imageUrl} />
					))}
				</AvatarGroup>
			</Td>
			<Td>
				<Text fontWeight="medium">{name}</Text>
			</Td>
			<Td w="full">
				<StatusTag status={session.status} />
			</Td>
			<Td pr={0}>
				<HStack spacing={4}>
					<Button
						as={Link}
						colorScheme="purple"
						isDisabled={isAnyLoading}
						size="sm"
						to={path}
					>
						{t('gameSessions.active.joinButton')}
					</Button>

					{isCompletable && (
						<Button
							colorScheme="blue"
							isDisabled={removeRequest.isLoading}
							isLoading={completeRequest.isLoading}
							onClick={completeConfirm.onOpen}
							size="sm"
						>
							{t('gameSessions.active.completeButton')}
						</Button>
					)}

					{isEditable && (
						<Menu>
							<MenuButton
								as={IconButton}
								aria-label={t('gameSessions.active.menuLabel')}
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
									icon={<TrashIcon boxSize={5} />}
									onClick={removeConfirm.onOpen}
									_hover={{ bg: 'background.float' }}
								>
									{t('gameSessions.active.menuRemove')}
								</MenuItem>
							</MenuList>
						</Menu>
					)}

					<Portal>
						<ConfirmationDialogue
							title={t('gameSessions.remove.confirmTitle')}
							description={t('gameSessions.remove.confirmDescription')}
							cancelText={t('gameSessions.remove.confirmCancel')}
							acceptText={t('gameSessions.remove.confirmAccept')}
							onAccept={removeRequest.mutate}
							colorScheme="red"
							isOpen={removeConfirm.isOpen}
							onClose={removeConfirm.onClose}
							isLoading={removeRequest.isLoading}
						/>
					</Portal>

					<Portal>
						<ConfirmationDialogue
							title={t('gameSessions.complete.confirmTitle')}
							description={t('gameSessions.complete.confirmDescription')}
							cancelText={t('gameSessions.complete.confirmCancel')}
							acceptText={t('gameSessions.complete.confirmAccept')}
							onAccept={completeRequest.mutate}
							colorScheme="blue"
							isOpen={completeConfirm.isOpen}
							onClose={completeConfirm.onClose}
							isLoading={completeRequest.isLoading}
						/>
					</Portal>
				</HStack>
			</Td>
		</Tr>
	);
};
