import { useEffect } from 'react';

import { Channel, relay } from '@/lib/events';
import { RenderEvent } from '@/lib/quill';

const ScrollEventMap = new Map([
	['w', 'up'],
	['a', 'left'],
	['s', 'down'],
	['d', 'right'],
]);

export const useMapScroll = () => {
	useEffect(() => {
		const keydown = (e: KeyboardEvent) => {
			const event = ScrollEventMap.get(e.key);

			if (event) {
				relay.send(RenderEvent.ScrollMap, event).to(Channel.Editor);
			}
		};

		document.addEventListener('keydown', keydown);

		return () => document.removeEventListener('keydown', keydown);
	}, []);
};
