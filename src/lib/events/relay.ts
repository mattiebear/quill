import { Relay } from '@space-station/relay';

export enum Channel {
	Data = 'data',
	Editor = 'editor',
	Story = 'story',
}

const relay = new Relay();

relay.create(Channel.Data);
relay.create(Channel.Editor);
relay.create(Channel.Story);

export { relay };
