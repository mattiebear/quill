import { useCallback } from 'react';

import { AddTokenEvent, useAddToken } from '../inbound/use-add-token';
import { ChangeMapEvent, useChangeMap } from '../inbound/use-change-map';
import {
	CompleteStoryEvent,
	useCompleteStory,
} from '../inbound/use-complete-story';
import {
	CurrentStateEvent,
	useCurrentStoryState,
} from '../inbound/use-current-story-state';
import { MoveTokenEvent, useMoveToken } from '../inbound/use-move-token';
import { RemoveTokenEvent, useRemoveToken } from '../inbound/use-remove-token';

type EventType =
	| AddTokenEvent
	| ChangeMapEvent
	| CompleteStoryEvent
	| CurrentStateEvent
	| MoveTokenEvent
	| RemoveTokenEvent;

export const useEventDispatch = () => {
	const addToken = useAddToken();
	const changeMap = useChangeMap();
	const completeStory = useCompleteStory();
	const setInitialState = useCurrentStoryState();
	const moveToken = useMoveToken();
	const removeToken = useRemoveToken();

	return useCallback(
		(data: EventType) => {
			switch (data.event) {
				case 'add-token':
					return addToken(data);

				case 'change-map':
					return changeMap(data);

				case 'complete-story':
					return completeStory();

				case 'current-story-state':
					return setInitialState(data);

				case 'move-token':
					return moveToken(data);

				case 'remove-token':
					return removeToken(data);
			}
		},
		[
			addToken,
			changeMap,
			completeStory,
			moveToken,
			removeToken,
			setInitialState,
		]
	);
};
