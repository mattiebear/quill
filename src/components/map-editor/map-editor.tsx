import { Text } from '@chakra-ui/react';

import { useMapDetail } from '@/api/maps';
import { useIdParam } from '@/lib/router/use-id-param';

export const MapEditor = () => {
	const id = useIdParam();
	const { data } = useMapDetail(id);

	// Get map data from API
	// Crate a new quill engine instance with map data. Store in a ref for now
	// Quill engine adds a pixi container to the DOM

	return <Text>Map editor for {id}</Text>;
};
