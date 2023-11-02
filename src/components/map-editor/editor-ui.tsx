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
import { useNavigate } from 'react-router-dom';

import { useInvalidateMap } from '@/api/maps';
import {
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon,
	ZoomInIcon,
	ZoomOutIcon,
} from '@/components/icon';
import { useMap } from '@/components/map-editor/hooks/use-map';
import { Path } from '@/config/routes';
import { useRelay } from '@/lib/messaging';
import { useTileset } from '@/lib/quill/hooks/use-tileset';
import { ChangeZoom } from '@/lib/quill/messages/rendering/change-zoom';

import { usePlaceTileAction } from './hooks/use-place-tile-action';

export const EditorUI: FC = () => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const map = useMap();
	const invalidate = useInvalidateMap(map);
	const navigate = useNavigate();
	const tileset = useTileset();
	const { send } = useRelay();
	const { action, rotateLeft, rotateRight, selectTile } = usePlaceTileAction();

	const handleClickDone = async () => {
		await invalidate();
		navigate(Path.Maps);
	};

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
							onClick={() => send(new ChangeZoom('out'))}
						/>
						<IconButton
							aria-label={t('editor.zoomIn')}
							icon={<ZoomInIcon />}
							onClick={() => send(new ChangeZoom('in'))}
						/>
					</Flex>

					<Flex columnGap={2} direction="row" mb={2}>
						<IconButton
							aria-label={t('editor.rotateLeft')}
							icon={<ArrowUturnRightIcon />}
							onClick={rotateRight}
						/>
						<IconButton
							aria-label={t('editor.rotateRight')}
							icon={<ArrowUturnLeftIcon />}
							onClick={rotateLeft}
						/>
					</Flex>

					<SimpleGrid columns={3} spacing={2} mb={2}>
						{tileset.all.map((blueprint) => (
							<Button
								key={blueprint.id}
								h="auto"
								p={2}
								onClick={() => selectTile(blueprint.id)}
								{...(blueprint.id === action.id && {
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
										src={blueprint.sprite.source(action.direction)}
									/>
								</AspectRatio>
							</Button>
						))}
					</SimpleGrid>

					<Button
						colorScheme="green"
						variant="outline"
						onClick={handleClickDone}
					>
						{t('common.done')}
					</Button>
				</Flex>
			</Draggable>
		</Box>
	);
};
