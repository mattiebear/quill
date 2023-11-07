import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Path } from '@/config/routes';
import { useResetAction } from '@/lib/quill/actions/hooks/use-reset-action';

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
	const reset = useResetAction();

	const handleClickDone = async () => {
		navigate(Path.GameSessions);
	};

	return (
		<>
			<SelectMapModal />

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
						icon={<UserGroupIcon />}
						keyBinding="T"
						label={t('editor.menuLabel.tokens')}
					>
						<RailMenuContent>
							<TokenSelector />
						</RailMenuContent>
					</RailMenuItem>

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
		</>
	);
};
