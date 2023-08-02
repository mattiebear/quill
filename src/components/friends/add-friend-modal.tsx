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
	useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FC, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInvalidateConnections } from '@/api/connections';
import { getHttpError, isHttpErrorResponse, useHttpClient } from '@/lib/http';
import { ConnectionDetailData } from '@/types/connection';

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
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateConnections();

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

	const { mutate, isLoading } = useMutation(
		(data: FormState) => {
			return http.post<ConnectionDetailData>('/connections/request', data);
		},
		{
			onSuccess: async (_data, form) => {
				await invalidate();

				toast({
					title: t('friends.create.successTitle'),
					description: t('friends.create.successDescription', {
						name: form.username,
					}),
					status: 'success',
				});

				onClose();
			},
			onError: (err) => {
				if (isHttpErrorResponse(err)) {
					getHttpError(err).each((location, code) => {
						toast({
							description: t(`friends.create.error.${location}`, {
								context: code,
								defaultValue: t('common.unknownError'),
							}),
							status: 'error',
						});
					});
				}
			},
		}
	);

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
							borderRadius="xl"
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
