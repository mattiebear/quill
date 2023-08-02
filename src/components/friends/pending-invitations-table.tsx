import {
	Avatar,
	Button,
	HStack,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tr,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useConnections } from '@/components/friends/hooks/use-connections';

export const PendingInvitationsTable: FC = () => {
	const { pendingConnections } = useConnections();
	const { t } = useTranslation();

	if (!pendingConnections.length) {
		return null;
	}

	return (
		<TableContainer color="text.table" w="full">
			<Heading as="h4" fontSize="xl" fontWeight="medium">
				{t('friends.pending.tableTitle')}
			</Heading>
			<Table variant="simple">
				<Tbody>
					{pendingConnections.map((connection) => {
						return (
							<Tr>
								<Td>
									<Avatar src={connection.connectedUser.profileImageUrl} />
								</Td>
								<Td w="full">
									<Text fontWeight="medium">
										{connection.connectedUser.username}
									</Text>
								</Td>
								<Td pr={0}>
									<HStack>
										<Button colorScheme="red" size="sm">
											{t('friends.pending.reject')}
										</Button>
										<Button colorScheme="blue" size="sm">
											{t('friends.pending.accept')}
										</Button>
									</HStack>
									{/*<IconButton*/}
									{/*	aria-label="Search database"*/}
									{/*	colorScheme="cyan"*/}
									{/*	icon={<EllipsisHorizontalIcon />}*/}
									{/*	isRound*/}
									{/*	size="sm"*/}
									{/*	variant="outline"*/}
									{/*	_hover={{*/}
									{/*		bg: 'blue.900',*/}
									{/*	}}*/}
									{/*/>*/}
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
