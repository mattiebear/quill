import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { SelectMapModal } from './select-map-modal';

export const PlayUI: FC = () => {
	return (
		<>
			<Box>
				<Text>Play Session</Text>
			</Box>

			<SelectMapModal />
		</>
	);
};
