import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface AddFriendModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
}

export const AddFriendModal: FC<AddFriendModalProps> = ({
	isOpen,
	onClose,
}) => {
	const { t } = useTranslation();

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg="background.cover">
				<ModalHeader color="text.heading">
					{t('friends.addFriendTitle')}
				</ModalHeader>
				<ModalCloseButton color="white" />
				<ModalBody>
					<Box as="form" autoComplete="off">
						<FormControl>
							<FormLabel color="text.form.label">
								{t('friends.field.username.label')}
							</FormLabel>
							<Input
								borderRadius="xl"
								color="text.form.input"
								placeholder={t('friends.field.username.placeholder')}
								type="text"
							/>
						</FormControl>
					</Box>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="purple">{t('friends.addFriendSubmit')}</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
