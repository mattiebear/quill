import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC, useRef } from 'react';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';

import { ZoomInIcon, ZoomOutIcon } from '@/components/icon';
import { useIO } from '@/components/map-editor/hooks/use-io';

export const EditorUI: FC = () => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const io = useIO();

	return (
		<Box position="absolute">
			{/* TODO: Create a menu component that encapsulates all of this */}
			{/* TODO: Save position to local storage */}
			<Draggable defaultPosition={{ x: 40, y: 40 }} nodeRef={nodeRef}>
				<Flex
					ref={nodeRef}
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

					<Flex columnGap={2} direction="row">
						<IconButton
							aria-label={t('editor.zoomOut')}
							icon={<ZoomOutIcon />}
							onClick={io.decreaseZoom}
						/>
						<IconButton
							aria-label={t('editor.zoomIn')}
							icon={<ZoomInIcon />}
							onClick={io.increaseZoom}
						/>
					</Flex>
				</Flex>
			</Draggable>
		</Box>
	);
};
