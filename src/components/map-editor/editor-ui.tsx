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
import { TileSelector } from './tile-selector';

export const EditorUI: FC = () => {
	const { t } = useTranslation();
	const map = useMap();
	const invalidate = useInvalidateMap(map);
	const navigate = useNavigate();

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
	);
};
