import {
	Box,
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Heading,
	Input,
	Spacer,
	useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { fetchMapsList, useInvalidateMaps } from '@/api/maps';
import { useHttpClient } from '@/lib/http';
import { ModuleMapDetailData } from '@/types/map';

interface FormState {
	name: string;
}

export const MapsNew: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateMaps();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormState>();

	const { mutate, isLoading } = useMutation(
		(data: FormState) => {
			return http.post<ModuleMapDetailData>('/maps', data);
		},
		{
			onSuccess: async (_data, form) => {
				await invalidate();
				await fetchMapsList();

				toast({
					title: t('maps.create.successTitle'),
					description: t('maps.create.successDescription', { name: form.name }),
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
				<Box as="form" autoComplete="off" onSubmit={handleSubmit(submitForm)}>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel color="text.form.label">
							{t('maps.field.name.label')}
						</FormLabel>
						<Input
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

					<HStack>
						<Spacer />
						<Button
							colorScheme="purple"
							isLoading={isLoading}
							mt={4}
							type="submit"
						>
							{t('common.create')}
						</Button>
					</HStack>
				</Box>
			</Container>
		</>
	);
};
