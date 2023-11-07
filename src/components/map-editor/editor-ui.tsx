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
import { useResetAction } from '@/lib/quill/actions/hooks/use-reset-action';

import { RailMenu, RailMenuContent, RailMenuItem } from '../rail-menu';
import { TileSelector } from './tile-selector';

export const EditorUI: FC = () => {
	const { t } = useTranslation();
	const map = useMap();
	const invalidate = useInvalidateMap(map);
	const navigate = useNavigate();
	const reset = useResetAction();

	const handleClickDone = async () => {
		await invalidate();
		navigate(Path.Maps);
	};

	return (
		<Box position="absolute" p={2}>
			<RailMenu onSelect={reset} resetOnEscape>
				<RailMenuItem
					icon={<CursorArrowRaysIcon />}
					keyBinding="S"
					label={t('editor.menuLabel.select')}
				/>

				<RailMenuItem
					icon={<ArrowsPointingOutIcon />}
					keyBinding="M"
					label={t('editor.menuLabel.move')}
				/>

				<RailMenuItem
					icon={<PaintBrushIcon />}
					keyBinding="C"
					label={t('editor.menuLabel.create')}
				>
					<RailMenuItem
						icon={<CubeIcon />}
						keyBinding="F"
						label={t('editor.menuLabel.floors')}
					>
						<RailMenuContent>
							<TileSelector type={TileType.Floor} />
						</RailMenuContent>
					</RailMenuItem>

					<RailMenuItem
						icon={<CubeIcon />}
						keyBinding="W"
						label={t('editor.menuLabel.walls')}
					>
						<RailMenuContent>
							<TileSelector type={TileType.Wall} />
						</RailMenuContent>
					</RailMenuItem>

					<RailMenuItem
						icon={<CubeIcon />}
						keyBinding="O"
						label={t('editor.menuLabel.objects')}
					>
						<RailMenuContent>
							<TileSelector type={TileType.Object} />
						</RailMenuContent>
					</RailMenuItem>
				</RailMenuItem>

				<RailMenuItem
					icon={<TrashIcon />}
					keyBinding="X"
					label={t('editor.menuLabel.remove')}
				/>

				<RailMenuItem
					icon={<Cog6ToothIcon />}
					keyBinding="P"
					label={t('editor.menuLabel.settings')}
				>
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
