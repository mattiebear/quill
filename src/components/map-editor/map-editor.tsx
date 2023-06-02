import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const MapEditor = () => {
	const { id } = useParams<{ id: string }>();

	// Get map data from API
	// Crate a new quill engine instance with map data. Store in a ref for now
	// Quill engine adds a pixi container to the DOM

	return <Text>Map editor for {id}</Text>;
};
