import { Relay } from '@space-station/relay';

export enum Channel {
	Data = 'data',
	Editor = 'editor',
}

const relay = new Relay();

relay.create(Channel.Data);
relay.create(Channel.Editor);

export { relay };
