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
import { useNavigate } from 'react-router-dom';

import { useHttpClient } from '@/lib/http';

interface FormState {
	name: string;
}

export const MapsNew: FC = () => {
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

	const onSubmit = (data: FormState) => mutate(data);

	return (
		<>
			<Heading color="text.heading" fontWeight="medium" size="md" py={8}>
				Create New Map
			</Heading>

			<Container maxW="container.lg">
				<Box as="form" onSubmit={handleSubmit(onSubmit)}>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel color="text.form.label">Name</FormLabel>
						<Input
							borderRadius="xl"
							color="text.form.input"
							type="text"
							{...register('name', { required: true })}
						/>

						{errors.name && (
							<FormErrorMessage>Every map needs a name</FormErrorMessage>
						)}
					</FormControl>

					<Button
						borderRadius="xl"
						colorScheme="purple"
						isLoading={isLoading}
						mt={4}
						type="submit"
					>
						Submit
					</Button>
				</Box>
			</Container>
		</>
	);
};
