import { Box, Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Path } from '@/config/routes';
import {
	PlayAction,
	PlayStore,
	usePlayStore,
} from '@/lib/engine/store/play-store';

import {
	Cog6ToothIcon,
	CursorArrowRaysIcon,
	MapIcon,
	UserGroupIcon,
} from '../../icon';
import { RailMenu, RailMenuContent, RailMenuItem } from '../../rail-menu';
import { TokenSelector } from '../token-selector';

export const OwnerMenu: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const setAction = usePlayStore((state) => state.setAction);

	const handleClickDone = async () => {
		navigate(Path.GameSessions);
	};

	const handleClickComplete = () => {
		PlayStore.setState({ isConfirmCompleteOpen: true });
	};

	const handleChangeMap = () => {
		PlayStore.setState({ isChangeMapOpen: true });
	};

	const handleAction = (action?: string) => {
		switch (action) {
			case 'select':
				setAction(PlayAction.SelectToken);
				break;

			default:
				setAction(null);
				break;
		}
	};

	return (
		<Box position="absolute" p={2} top={0}>
			<RailMenu onSelect={handleAction} resetOnEscape>
				<RailMenuItem
					action="select"
					icon={<CursorArrowRaysIcon />}
					label={t('play.menuLabel.select')}
				/>

				<RailMenuItem
					icon={<UserGroupIcon />}
					label={t('play.menuLabel.tokens')}
				>
					<RailMenuContent>
						<TokenSelector />
					</RailMenuContent>
				</RailMenuItem>

				<RailMenuItem
					action="map"
					icon={<MapIcon />}
					label={t('play.menuLabel.map')}
				>
					<RailMenuContent>
						<Button colorScheme="blue" onClick={handleChangeMap}>
							{t('play.menuLabel.changeMap')}
						</Button>
					</RailMenuContent>
				</RailMenuItem>

				<RailMenuItem
					icon={<Cog6ToothIcon />}
					label={t('play.menuLabel.settings')}
				>
					<RailMenuContent>
						<Stack>
							<Button colorScheme="green" onClick={handleClickDone}>
								{t('common.done')}
							</Button>

							<Button colorScheme="blue" onClick={handleClickComplete}>
								Complete story
							</Button>
						</Stack>
					</RailMenuContent>
				</RailMenuItem>
			</RailMenu>
		</Box>
	);
};
