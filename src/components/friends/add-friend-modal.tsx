import {
	Button,
	FormControl,
	FormErrorMessage,
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
import { FC, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCreateConnection } from '@/components/friends/hooks/use-create-connection';

interface AddFriendModalProps {
	isOpen: boolean;
	onClose: VoidFunction;
}

interface FormState {
	username: string;
}

export const AddFriendModal: FC<AddFriendModalProps> = ({
	isOpen,
	onClose,
}) => {
	const { t } = useTranslation();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<FormState>();

	useLayoutEffect(() => {
		if (isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	const { mutate, isLoading } = useCreateConnection({ onSuccess: onClose });

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
					{t('friends.addFriendTitle')}
				</ModalHeader>
				<ModalCloseButton color="white" />
				<ModalBody>
					<FormControl isInvalid={!!errors.username}>
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
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="purple"
						isLoading={isLoading}
						onClick={handleSubmit(submitForm)}
						type="submit"
					>
						{t('friends.addFriendSubmit')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
