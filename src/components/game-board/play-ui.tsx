import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Path } from '@/config/routes';

import {
	ArrowsPointingOutIcon,
	Cog6ToothIcon,
	CursorArrowRaysIcon,
	UserGroupIcon,
} from '../icon';
import { RailMenu, RailMenuContent, RailMenuItem } from '../rail-menu';
import { SelectMapModal } from './select-map-modal';
import { TokenSelector } from './token-selector';

export const PlayUI: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleClickDone = async () => {
		navigate(Path.GameSessions);
	};

	return (
		<>
			<SelectMapModal />

			<Box position="absolute" p={2}>
				<RailMenu>
					<RailMenuItem
						icon={<CursorArrowRaysIcon />}
						label={t('editor.menuLabel.select')}
					/>
					<RailMenuItem
						icon={<ArrowsPointingOutIcon />}
						label={t('editor.menuLabel.move')}
					/>

					<RailMenuItem
						icon={<UserGroupIcon />}
						label={t('editor.menuLabel.tokens')}
					>
						<RailMenuContent>
							<TokenSelector />
						</RailMenuContent>
					</RailMenuItem>
					<RailMenuItem
						icon={<Cog6ToothIcon />}
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
		</>
	);
};
