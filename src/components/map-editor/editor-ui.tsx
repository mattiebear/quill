import { Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Draggable from 'react-draggable';

export const EditorUI: FC = () => {
	return (
		<Box position="absolute">
			{/* TODO: Create a menu component that encapsulates all of this */}
			<Draggable defaultPosition={{ x: 40, y: 40 }}>
				<Flex
					bg="background.float"
					borderRadius="3xl"
					cursor="grab"
					direction="column"
					minW="22rem"
					p={4}
				>
					<Text color="text.body" fontSize="xl">
						Build
					</Text>
				</Flex>
			</Draggable>
		</Box>
	);
};
