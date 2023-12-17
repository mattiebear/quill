import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { usePlayState } from './hooks/use-play-state';
import { SelectTokenTable } from './select-token-table';

export const SelectTokenModal = () => {
	const { t } = useTranslation();
	const { isTokenSelectorOpen } = usePlayState();

	return (
		<Modal isOpen={isTokenSelectorOpen} onClose={() => void 0}>
			<ModalOverlay />
			<ModalContent bg="background.cover">
				<ModalHeader color="text.heading">
					{t('selectToken.header')}
				</ModalHeader>

				<ModalBody>
					<SelectTokenTable />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
