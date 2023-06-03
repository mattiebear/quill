import { Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { useMapDetail } from '@/api/maps';
import { PageLoading } from '@/components/loading';
import { QuillEngine } from '@/lib/quill';
import { useIdParam } from '@/lib/router';

export const MapEditor = () => {
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engineRef = useRef<QuillEngine>();

	// TODO: Store in a custom hook
	useEffect(() => {
		if (data && !engineRef.current) {
			const app = new QuillEngine();
			app.initialize();
			engineRef.current = app;
		}

		// TODO: Remove instance on unload
	}, [data]);

	if (!data) {
		return <PageLoading />;
	}

	return <Text>Map editor for {id}</Text>;
};
