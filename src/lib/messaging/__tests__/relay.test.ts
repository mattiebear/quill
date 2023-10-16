import { expect, it, vi } from 'vitest';

import { Message } from '../message';
import { Relay } from '../relay';

it('adds a subscription', () => {
	const relay = new Relay();
	const handler = vi.fn();

	relay.on(Message, handler);

	const message = new Message();

	relay.send(message);

	expect(handler).toHaveBeenCalledOnce();
});

it('sends message to only the message type', () => {
	const relay = new Relay();
	const handler = vi.fn();
	const ignored = vi.fn();

	class NonMessage extends Message {}

	relay.on(Message, handler);
	relay.on(NonMessage, ignored);

	const message = new Message();

	relay.send(message);

	expect(handler).toHaveBeenCalledOnce();
	expect(ignored).not.toHaveBeenCalled();
});

it('sends message to all handlers of type', () => {
	const relay = new Relay();
	const handler1 = vi.fn();
	const handler2 = vi.fn();

	relay.on(Message, handler1);
	relay.on(Message, handler2);

	const message = new Message();

	relay.send(message);

	expect(handler1).toHaveBeenCalledOnce();
	expect(handler2).toHaveBeenCalledOnce();
});

it('unsubscribes', () => {
	const relay = new Relay();
	const handler1 = vi.fn();
	const handler2 = vi.fn();

	const unsub = relay.on(Message, handler1);
	relay.on(Message, handler2);

	const message = new Message();

	relay.send(message);

	expect(handler1).toHaveBeenCalledOnce();
	expect(handler2).toHaveBeenCalledOnce();

	unsub();

	relay.send(message);

	expect(handler1).toHaveBeenCalledOnce();
	expect(handler2).toHaveBeenCalledTimes(2);
});
