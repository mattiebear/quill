import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useInvalidateMap } from '@/api/maps';
import {
	ArrowsPointingOutIcon,
	Cog6ToothIcon,
	CubeIcon,
	CursorArrowRaysIcon,
	PaintBrushIcon,
	TrashIcon,
} from '@/components/icon';
import { useMap } from '@/components/map-editor/hooks/use-map';
import { Path } from '@/config/routes';
import { TileType } from '@/lib/quill';

import { RailMenu, RailMenuContent, RailMenuItem } from '../rail-menu';
import { usePlaceTileAction } from './hooks/use-place-tile-action';
import { TileSelector } from './tile-selector';

export const EditorUI: FC = () => {
	const { t } = useTranslation();
	const map = useMap();
	const invalidate = useInvalidateMap(map);
	const navigate = useNavigate();
	// const { action, rotateLeft, rotateRight, selectTile } = usePlaceTileAction();

	const handleClickDone = async () => {
		await invalidate();
		navigate(Path.Maps);
	};

	return (
		<Box position="absolute" p={2}>
			<RailMenu>
				<RailMenuItem icon={<CursorArrowRaysIcon />} label="Select" />
				<RailMenuItem icon={<ArrowsPointingOutIcon />} label="Move" />
				<RailMenuItem icon={<PaintBrushIcon />} label="Create" keyBinding="C">
					<RailMenuItem icon={<CubeIcon />} label="Floors">
						<RailMenuContent>
							<TileSelector type={TileType.Floor} />
						</RailMenuContent>
					</RailMenuItem>

					<RailMenuItem icon={<CubeIcon />} label="Walls">
						<RailMenuContent>
							<TileSelector type={TileType.Wall} />
						</RailMenuContent>
					</RailMenuItem>

					<RailMenuItem icon={<CubeIcon />} label="Objects">
						<RailMenuContent>
							<TileSelector type={TileType.Object} />
						</RailMenuContent>
					</RailMenuItem>
				</RailMenuItem>
				<RailMenuItem icon={<TrashIcon />} label="Remove" />
				<RailMenuItem icon={<Cog6ToothIcon />} label="Settings">
					<RailMenuContent>
						<Button colorScheme="green" onClick={handleClickDone}>
							{t('common.done')}
						</Button>
					</RailMenuContent>
				</RailMenuItem>
			</RailMenu>
		</Box>
		// <Box position="absolute">
		// 	{/* TODO: Create a menu component that encapsulates all of this */}
		// 	{/* TODO: Save position to local storage */}
		// 	<Draggable defaultPosition={{ x: 40, y: 40 }} nodeRef={nodeRef}>
		// 		<Flex
		// 			ref={nodeRef}
		// 			bg="background.float"
		// 			borderRadius="3xl"
		// 			cursor="grab"
		// 			direction="column"
		// 			minW="22rem"
		// 			p={4}
		// 		>
		// 			<Text color="text.body" fontSize="xl">
		// 				Build
		// 			</Text>

		// 			<Flex columnGap={2} direction="row" mb={2}>
		// 				<IconButton
		// 					aria-label={t('editor.zoomOut')}
		// 					icon={<ZoomOutIcon />}
		// 					onClick={() => send(new ChangeZoom('out'))}
		// 				/>
		// 				<IconButton
		// 					aria-label={t('editor.zoomIn')}
		// 					icon={<ZoomInIcon />}
		// 					onClick={() => send(new ChangeZoom('in'))}
		// 				/>
		// 			</Flex>

		// 			<Flex columnGap={2} direction="row" mb={2}>
		// 				<IconButton
		// 					aria-label={t('editor.rotateLeft')}
		// 					icon={<ArrowUturnRightIcon />}
		// 					onClick={rotateRight}
		// 				/>
		// 				<IconButton
		// 					aria-label={t('editor.rotateRight')}
		// 					icon={<ArrowUturnLeftIcon />}
		// 					onClick={rotateLeft}
		// 				/>
		// 			</Flex>

		// 			<Button
		// 				colorScheme="green"
		// 				variant="outline"
		// 				onClick={handleClickDone}
		// 			>
		// 				{t('common.done')}
		// 			</Button>
		// 		</Flex>
		// 	</Draggable>
		// </Box>
	);
};
