import { expect, it, vi } from 'vitest';

import { Direction } from '../../types/map';
import { ActionManager } from '../action-manager';
import { PlaceTileAction } from '../place-tile-action';
import { ActionStore, resetActionStore } from '../store';

beforeEach(() => {
	resetActionStore();
});

it('gets an action', () => {
	const actions = new ActionManager(ActionStore);

	const action = actions.get(PlaceTileAction);

	expect(action).toBeInstanceOf(PlaceTileAction);
});

it('updates an action', () => {
	const observer = vi.fn();
	const unsubscribe = ActionStore.subscribe(observer);

	const actions = new ActionManager(ActionStore);
	const updated = new PlaceTileAction('123', Direction.S);

	const action = actions.update(updated);

	expect(action).toBeInstanceOf(PlaceTileAction);
	expect(action).toMatchObject({ id: '123', direction: Direction.S });
	expect(observer).toHaveBeenCalledOnce();

	unsubscribe();
});

it('activates an action', () => {
	const observer = vi.fn();
	const unsubscribe = ActionStore.subscribe(observer);

	const actions = new ActionManager(ActionStore);
	const updated = new PlaceTileAction('234', Direction.S);

	const action = actions.activate(updated);

	expect(action).toBeInstanceOf(PlaceTileAction);
	expect(action).toMatchObject({ id: '234', direction: Direction.S });
	expect(observer).toHaveBeenCalledOnce();
	expect(actions.isActive(PlaceTileAction)).toBe(true);
	expect(actions.active()).toBe(action);

	unsubscribe();
});
