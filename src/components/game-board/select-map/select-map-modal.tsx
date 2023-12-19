import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { usePlayState } from '../hooks/use-play-state';
import { useSelectMap } from '../hooks/use-select-map';
import { MapTable } from './map-table';

export const SelectMapModal: FC = () => {
	const { t } = useTranslation();
	const { isMapSelectorOpen } = usePlayState();
	const handleSelectMap = useSelectMap();

	return (
		<Modal isOpen={isMapSelectorOpen} onClose={() => void 0}>
			<ModalOverlay />
			<ModalContent bg="background.cover">
				<ModalHeader color="text.heading">{t('selectMap.header')}</ModalHeader>

				<ModalBody>
					<MapTable onSelectMap={handleSelectMap} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
