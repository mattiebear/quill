import { Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { GameSessionStatus } from '@/entites/game-session';

interface StatusTagProps {
	status: GameSessionStatus;
}

const getColor = (status: GameSessionStatus): string => {
	switch (status) {
		case GameSessionStatus.Active:
			return 'green.200';

		case GameSessionStatus.Complete:
			return 'purple.200';

		default:
			return 'blue.200';
	}
};

export const StatusTag: FC<StatusTagProps> = ({ status }) => {
	const { t } = useTranslation();

	return (
		<Flex alignItems="center">
			<Box boxSize={2} borderRadius="full" bg={getColor(status)} mr={2} />
			<Text>
				{t('gameSessions.status', { context: status, defaultValue: '' })}
			</Text>
		</Flex>
	);
};
