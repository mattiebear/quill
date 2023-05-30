import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const MapEditor = () => {
	const { id } = useParams<{ id: string }>();

	return <Text>Map editor for {id}</Text>;
};
