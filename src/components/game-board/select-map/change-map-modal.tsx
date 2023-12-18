import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PlayStore, usePlayStore } from '@/lib/engine/store/play-store';

import { useChangeMap } from '../hooks/use-change-map';
import { MapTable } from './map-table';

export const ChangeMapModal: FC = () => {
	const { t } = useTranslation();
	const isOpen = usePlayStore((state) => state.isChangeMapOpen);
	const handleSelectMap = useChangeMap();
	const handleClose = () => {
		PlayStore.setState({ isChangeMapOpen: false });
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<ModalOverlay />
			<ModalContent bg="background.cover">
				<ModalHeader color="text.heading">{t('changeMap.header')}</ModalHeader>

				<ModalBody>
					<MapTable onSelectMap={handleSelectMap} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
