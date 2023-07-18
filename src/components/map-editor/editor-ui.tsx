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

import {
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon,
	ZoomInIcon,
	ZoomOutIcon,
} from '@/components/icon';
import { useEngine } from '@/components/map-editor/hooks/use-engine';
import { useIO } from '@/components/map-editor/hooks/use-io';
import { useStoreValue } from '@/components/map-editor/hooks/use-store-value';
import { Direction } from '@/lib/quill';
import { StoreKey } from '@/lib/quill/types/store';

export const EditorUI: FC = () => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const io = useIO();
	const engine = useEngine();

	const blueprintId = useStoreValue<string>(StoreKey.SelectedBlueprint);
	const direction = useStoreValue<Direction>(StoreKey.SelectedDirection);

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

					<Flex columnGap={2} direction="row" mb={2}>
						<IconButton
							aria-label={t('editor.rotateLeft')}
							icon={<ArrowUturnRightIcon />}
							onClick={io.rotateRight}
						/>
						<IconButton
							aria-label={t('editor.rotateRight')}
							icon={<ArrowUturnLeftIcon />}
							onClick={io.rotateLeft}
						/>
					</Flex>

					<SimpleGrid columns={3} spacing={2}>
						{engine.tileset.all.map((blueprint) => (
							<Button
								key={blueprint.id}
								h="auto"
								p={2}
								onClick={() => io.selectBlueprint(blueprint.id)}
								{...(blueprint.id === blueprintId && {
									// TODO: Use semantic value
									bg: 'green.500',
									_hover: {
										bg: 'green.500',
									},
								})}
							>
								<AspectRatio w="full" ratio={1}>
									<Image
										objectPosition="bottom center"
										src={blueprint.sprite.source(direction)}
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
