import {
	Box,
	Button,
	HStack,
	Popover,
	PopoverAnchor,
	PopoverContent,
} from '@chakra-ui/react';
import { pick } from 'ramda';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RequestRemoveToken } from '@/lib/engine/events/outbound/request-remove-token';
import { useEventManager } from '@/lib/engine/hooks/use-event-manager';
import {
	PlayAction,
	PlayStore,
	usePlayStore,
} from '@/lib/engine/store/play-store';

const TokenMenu: FC = () => {
	const { t } = useTranslation();
	const { transmit } = useEventManager();
	const { interactionPosition, isTokenMenuOpen, selectedToken } = usePlayStore(
		pick(['interactionPosition', 'isTokenMenuOpen', 'selectedToken'])
	);

	const handleClickRemove = () => {
		if (selectedToken) {
			transmit(new RequestRemoveToken(selectedToken));
		}
	};

	const handleClickMove = () => {
		if (selectedToken) {
			PlayStore.setState({
				action: PlayAction.MoveToken,
				isTokenMenuOpen: false,
			});
		}
	};

	return (
		<Popover isOpen={isTokenMenuOpen}>
			<PopoverAnchor>
				<Box
					pos="absolute"
					{...(interactionPosition && {
						left: interactionPosition.x,
						top: interactionPosition.y,
					})}
				/>
			</PopoverAnchor>

			<PopoverContent
				bg="background.cover"
				border="none"
				borderRadius="lg"
				p={3}
				pos="relative"
				w="auto"
			>
				<HStack>
					<Button boxShadow="md" colorScheme="blue" onClick={handleClickMove}>
						{t('tokenMenu.move')}
					</Button>
					<Button boxShadow="md" colorScheme="red" onClick={handleClickRemove}>
						{t('tokenMenu.remove')}
					</Button>
				</HStack>
			</PopoverContent>
		</Popover>
	);
};

export default TokenMenu;
