import {
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
	VStack,
} from '@chakra-ui/react';
import { FC, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCurrentUser } from '@/lib/auth/use-current-user';

import { useCreatePlaySession } from './hooks/use-create-play-session';
import { PlayerSelectionList } from './player-selection-list';
import { FormState } from './types';

interface AddPlaySessionModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
}

export const AddPlaySessionModal: FC<AddPlaySessionModalProps> = ({
	isOpen,
	onClose,
}) => {
	const { t } = useTranslation();
	const user = useCurrentUser();

	const { control, register, reset, handleSubmit } = useForm<FormState>({
		defaultValues: {
			name: '',
			userIds: [],
		},
	});

	useLayoutEffect(() => {
		if (isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	const { mutate, isLoading } = useCreatePlaySession({ onSuccess: onClose });

	const submitForm = (data: FormState) => mutate(data);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				as="form"
				bg="background.cover"
				autoComplete="off"
				onSubmit={(e) => e.preventDefault()}
			>
				<ModalHeader color="text.heading">
					{t('playSessions.addSessionTitle')}
				</ModalHeader>
				<ModalCloseButton color="white" />
				<ModalBody>
					<VStack spacing={6}>
						<FormControl>
							<FormLabel color="text.form.label">
								{t('playSessions.field.name.label')}
							</FormLabel>
							<Input
								autoFocus
								color="text.form.input"
								placeholder={t('playSessions.field.name.placeholder', {
									name: user.username,
								})}
								type="text"
								{...register('name')}
							/>
						</FormControl>

						<FormControl>
							<FormLabel color="text.form.label">
								{t('playSessions.field.players.label')}
							</FormLabel>
							<PlayerSelectionList control={control} />
						</FormControl>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="purple"
						isLoading={isLoading}
						onClick={handleSubmit(submitForm)}
						type="submit"
					>
						{t('playSessions.createStorySubmit')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
