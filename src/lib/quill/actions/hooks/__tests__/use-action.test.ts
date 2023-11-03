import { act, renderHook } from '@testing-library/react';
import { expect, it } from 'vitest';

import { PlaceTileAction } from '../..';
import { ActionManager } from '../../action-manager';
import { ActionStore, resetActionStore } from '../../store';
import { useAction } from '../use-action';

beforeEach(() => {
	resetActionStore();
});

it('returns the action', () => {
	const actions = new ActionManager(ActionStore);
	const defaultAction = new PlaceTileAction();

	const { result } = renderHook(() => useAction(PlaceTileAction));

	expect(result.current).toMatchObject(defaultAction);

	const newAction = new PlaceTileAction('test');

	act(() => {
		actions.update(newAction);
	});

	expect(result.current).toMatchObject(newAction);
});
