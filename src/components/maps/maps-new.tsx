import {
	Box,
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface FormState {
	name: string;
}

export const MapsNew: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormState>();

	const onSubmit = (data: any) => console.log(data);

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
							borderRadius="sm"
							color="text.form.input"
							type="text"
							{...register('name', { required: true })}
						/>

						{errors.name && (
							<FormErrorMessage>This field is required</FormErrorMessage>
						)}
					</FormControl>

					<Button borderRadius="sm" colorScheme="purple" mt={4} type="submit">
						Submit
					</Button>
				</Box>
			</Container>
		</>
	);
};
