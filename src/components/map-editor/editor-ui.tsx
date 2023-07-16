import {
	AspectRatio,
	Box,
	Button,
	Flex,
	IconButton,
	Image,
	SimpleGrid,
	Text,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';

import { ZoomInIcon, ZoomOutIcon } from '@/components/icon';
import { useEngine } from '@/components/map-editor/hooks/use-engine';
import { useIO } from '@/components/map-editor/hooks/use-io';
import { Direction } from '@/lib/quill';

export const EditorUI: FC = () => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const io = useIO();
	const engine = useEngine();

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

					<Flex columnGap={2} direction="row" mb={2}>
						<IconButton
							aria-label={t('editor.zoomOut')}
							icon={<ZoomOutIcon />}
							onClick={io.onClickZoomOut}
						/>
						<IconButton
							aria-label={t('editor.zoomIn')}
							icon={<ZoomInIcon />}
							onClick={io.onClickZoomIn}
						/>
					</Flex>

					<SimpleGrid columns={3} spacing={2}>
						{engine.tileset.all.map((tile) => (
							<Button key={tile.id} h="auto" p={2}>
								<AspectRatio w="full" ratio={1}>
									<Image
										objectPosition="bottom center"
										src={tile.sprite.source(Direction.N)}
									/>
								</AspectRatio>
							</Button>
						))}
					</SimpleGrid>
				</Flex>
			</Draggable>
		</Box>
	);
};
