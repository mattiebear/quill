import {
	Box,
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useHttpClient } from '@/lib/http';

interface FormState {
	name: string;
}

export const MapsNew: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const http = useHttpClient();
	const toast = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormState>();

	const { mutate, isLoading } = useMutation(
		(data: FormState) => {
			return http.post('/maps', data);
		},
		{
			onSuccess: (_data, form) => {
				toast({
					title: 'New map created',
					description: `Your new map "${form.name}" has been created`,
					status: 'success',
				});
				navigate('/maps');
			},
		}
	);

	const submitForm = (data: FormState) => mutate(data);

	return (
		<>
			<Heading
				color="text.heading"
				fontWeight="medium"
				size="md"
				py={8}
				textTransform="capitalize"
			>
				{t('maps.newMapTitle')}
			</Heading>

			<Container maxW="container.lg">
				<Box as="form" onSubmit={handleSubmit(submitForm)}>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel color="text.form.label">
							{t('maps.field.name.label')}
						</FormLabel>
						<Input
							borderRadius="xl"
							color="text.form.input"
							type="text"
							{...register('name', { required: true })}
						/>

						{errors.name && (
							<FormErrorMessage>
								{t('maps.field.name.requiredError')}
							</FormErrorMessage>
						)}
					</FormControl>

					<Button
						borderRadius="xl"
						colorScheme="purple"
						isLoading={isLoading}
						mt={4}
						type="submit"
					>
						{t('common.create')}
					</Button>
				</Box>
			</Container>
		</>
	);
};
