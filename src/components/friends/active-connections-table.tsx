import {
	Avatar,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
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
import { EllipsisHorizontalIcon, UserMinusIcon } from '@/components/icon';

export const ActiveConnectionsTable: FC = () => {
	const { acceptedConnections: connections } = useConnections();
	const { t } = useTranslation();

	if (!connections.length) {
		return null;
	}

	return (
		<TableContainer color="text.table" w="full">
			<Heading as="h4" fontSize="lg" fontWeight="medium">
				{t('friends.active.tableTitle', { count: connections.length })}
			</Heading>
			<Table variant="simple">
				<Tbody>
					{connections.map((connection) => {
						return (
							<Tr>
								<Td pl={0}>
									<Avatar src={connection.connectedUser.profileImageUrl} />
								</Td>
								<Td w="full">
									<Text fontWeight="medium">
										{connection.connectedUser.username}
									</Text>
								</Td>
								<Td pr={0}>
									<Menu>
										<MenuButton
											as={IconButton}
											aria-label={t('friends.active.menuLabel', {
												username: connection.connectedUser.username,
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
												_hover={{ bg: 'background.float' }}
											>
												{t('friends.active.menuRemove')}
											</MenuItem>
										</MenuList>
									</Menu>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
