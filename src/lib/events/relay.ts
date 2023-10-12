import { Relay } from '@space-station/relay';

export enum Channel {
	Quill = 'quill',
}

const relay = new Relay();

relay.create(Channel.Quill);

export { relay };
