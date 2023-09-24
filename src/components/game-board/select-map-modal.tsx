import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { usePlayState } from './hooks/use-play-state';
import { SelectMapTable } from './select-map-table';

export const SelectMapModal = () => {
	const { t } = useTranslation();
	const { isMapSelectorOpen } = usePlayState();

	return (
		<Modal isOpen={isMapSelectorOpen} onClose={() => console.log('close')}>
			<ModalOverlay />
			<ModalContent bg="background.cover">
				<ModalHeader color="text.heading">{t('selectMap.header')}</ModalHeader>

				<ModalBody>
					<SelectMapTable />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
