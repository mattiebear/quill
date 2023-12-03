import { useToast } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { TileStore } from '@/lib/engine/store/tile-store';
import { useHttpClient } from '@/lib/http';
import { DynamicPath } from '@/lib/url';

import { useEditorContext } from '../../../components/map-editor/context';
import { TileState } from '../map/tile-state';

export const useQueueMapUpdate = () => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const { map } = useEditorContext();
	const toast = useToast();
	const http = useHttpClient();
	const { t } = useTranslation();

	return useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(async () => {
			const state = TileStore.getState();

			const url = new DynamicPath('/maps/:id').for(map).toString();
			const atlas = Object.assign({}, map.atlas, {
				data: new TileState(state).toJSON(),
			});

			await http.patch(url, { atlas });

			toast({
				status: 'success',
				title: t('editor.mapSaved'),
				duration: 2000,
			});
		}, 3000);
	}, [http, map, t, toast]);
};
