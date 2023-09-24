import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { PlayStage } from '@/lib/quill/store';

import { usePlayStage } from './hooks/use-play-stage';

export const SelectMapModal = () => {
	const { t } = useTranslation();
	const stage = usePlayStage();

	const isMapSelectorOpen = stage === PlayStage.MapSelect;

	console.log({ stage });

	return (
		<Modal isOpen={isMapSelectorOpen} onClose={() => console.log('close')}>
			<ModalOverlay />
			<ModalContent bg="background.cover">
				<ModalHeader color="text.heading">
					{t('friends.addFriendTitle')}
				</ModalHeader>
				<ModalBody>
					here's where to pick a map
					{/* <FormControl isInvalid={!!errors.username} isRequired>
					<FormLabel color="text.form.label">
						{t('friends.field.username.label')}
					</FormLabel>
					<Input
						autoFocus
						color="text.form.input"
						placeholder={t('friends.field.username.placeholder')}
						type="text"
						{...register('username', { required: true })}
					/>

					{errors.username && (
						<FormErrorMessage>
							{t('friends.field.username.requiredError')}
						</FormErrorMessage>
					)}
				</FormControl> */}
				</ModalBody>

				<ModalFooter>
					{/* <Button
					colorScheme="purple"
					isLoading={isLoading}
					onClick={handleSubmit(submitForm)}
					type="submit"
				>
					{t('friends.addFriendSubmit')}
				</Button> */}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
