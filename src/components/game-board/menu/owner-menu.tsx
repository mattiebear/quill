import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Path } from '@/config/routes';
import { PlayAction, usePlayStore } from '@/lib/engine/store/play-store';

import { Cog6ToothIcon, CursorArrowRaysIcon, UserGroupIcon } from '../../icon';
import { RailMenu, RailMenuContent, RailMenuItem } from '../../rail-menu';
import { TokenSelector } from '../token-selector';

export const OwnerMenu: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const setAction = usePlayStore((state) => state.setAction);

	const handleClickDone = async () => {
		navigate(Path.GameSessions);
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
					label={t('editor.menuLabel.select')}
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
	);
};
