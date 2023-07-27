import { Card, CardBody, Center, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

const getErrorStatus = (error: unknown) => {
	if (
		error &&
		typeof error === 'object' &&
		'status' in error &&
		typeof error.status === 'number'
	) {
		return error.status;
	}

	return 500;
};

export const ErrorBoundary: FC = () => {
	const error = useRouteError();
	const status = getErrorStatus(error);

	return (
		<Center h="full">
			<Card>
				<CardBody>
					<Text>An error occurred: {status}</Text>
				</CardBody>
			</Card>
		</Center>
	);
};
