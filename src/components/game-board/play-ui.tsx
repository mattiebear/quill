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

import { Path } from '@/config/routes';
import { useRelay } from '@/lib/messaging';
import { useTokenset } from '@/lib/quill/hooks/use-tokenset';
import { ChangeZoom } from '@/lib/quill/messages/rendering/change-zoom';

import { ZoomInIcon, ZoomOutIcon } from '../icon';
import { usePlaceTokenAction } from './hooks/use-place-token-action';
import { SelectMapModal } from './select-map-modal';

export const PlayUI: FC = () => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const tokenset = useTokenset();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { send } = useRelay();
	const { action, selectToken } = usePlaceTokenAction();

	const handleClickDone = async () => {
		navigate(Path.GameSessions);
	};

	return (
		<>
			<SelectMapModal />

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
							Play
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

						<SimpleGrid columns={3} spacing={2} mb={2}>
							{tokenset.all.map((token) => (
								<Button
									key={token.id}
									h="auto"
									p={2}
									onClick={() => selectToken(token.id)}
									{...(token.id === action.id && {
										// TODO: Use semantic value
										bg: 'green.500',
										_hover: {
											bg: 'green.500',
										},
									})}
								>
									<AspectRatio w="full" ratio={1}>
										<Image objectPosition="bottom center" src={token.iconSrc} />
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
		</>
	);
};
