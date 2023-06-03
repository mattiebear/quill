import { Text } from '@chakra-ui/react';

import { useMapDetail } from '@/api/maps';
import { PageLoading } from '@/components/loading';
import { QuillEngine } from '@/lib/quill';
import { useIdParam } from '@/lib/router';
import { useStatic } from '@/lib/state';

const initializeEngine = () => {
	// TODO: add map data
	const engine = new QuillEngine();
	engine.initialize();
	return engine;
};

export const MapEditor = () => {
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engine = useStatic(() => initializeEngine());

	console.log({ engine });

	if (!engine) {
		return <PageLoading />;
	}

	// Get map data from API
	// Crate a new quill engine instance with map data. Store in a ref for now
	// Quill engine adds a pixi container to the DOM

	return <Text>Map editor for {id}</Text>;
};
