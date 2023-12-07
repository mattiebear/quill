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

import { PlayStore, usePlayStore } from '@/lib/engine/store/play-store';

const TokenMenu: FC = () => {
	const { t } = useTranslation();
	const { interactionPosition, selectedToken } = usePlayStore(
		pick(['interactionPosition', 'selectedToken'])
	);

	const isOpen = !!interactionPosition && !!selectedToken;

	const handleClose = () => {
		PlayStore.setState({ selectedToken: null, interactionPosition: null });
	};

	return (
		<Popover isOpen={isOpen} onClose={handleClose}>
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
				borderRadius="lg"
				p={3}
				pos="relative"
				w="auto"
			>
				<HStack>
					<Button boxShadow="md" colorScheme="blue">
						{t('tokenMenu.move')}
					</Button>
					<Button boxShadow="md" colorScheme="red">
						{t('tokenMenu.remove')}
					</Button>
				</HStack>
			</PopoverContent>
		</Popover>
	);
};

export default TokenMenu;
