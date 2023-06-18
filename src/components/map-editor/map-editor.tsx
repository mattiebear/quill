import { useEffect, useRef } from 'react';

import { useMapDetail } from '@/api/maps';
import { PageLoading } from '@/components/loading';
import * as Quill from '@/lib/quill';
import { useIdParam } from '@/lib/router';

import { EditorUI } from './editor-ui';

export const MapEditor = () => {
	// TODO: Create an element and append it to the body
	// const elRef = useRef<HTMLDivElement>(
	// 	document.getElementById('root') as HTMLDivElement
	// );
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engineRef = useRef<Quill.Engine>();

	// TODO: Store in a custom hook
	useEffect(() => {
		if (data && !engineRef.current) {
			const engine = new Quill.Engine();

			engine.initialize();

			engineRef.current = engine;
		}

		// TODO: Remove instance on unload
	}, [data]);

	if (!data) {
		return <PageLoading />;
	}

	return <EditorUI />;
};
