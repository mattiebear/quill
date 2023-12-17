import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { usePlayState } from '../hooks/use-play-state';
import { OwnerMenu } from './owner-menu';
import { PlayerMenu } from './player-menu';

export const PlayUI: FC = () => {
	const { isUserOwner } = usePlayState();

	return (
		<Box position="absolute" p={2} top={0}>
			{isUserOwner ? <OwnerMenu /> : <PlayerMenu />}
		</Box>
	);
};
