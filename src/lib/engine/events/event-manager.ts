import { PlayStore } from '../store/play-store';

export class EventManager {
	private inbound: any[] = [];

	// TODO: This will be removed for a hook-based approach
	constructor(private context: any) {}

	// Register an inbound event
	register(...events: any[]) {
		this.inbound.push(...events);
	}

	// Run the appropriate registered event
	dispatch(event: { event: string; data: any }): void {
		const ctor = this.inbound.find((ctor) => ctor.event === event.event);

		if (ctor) {
			new ctor(event.data, this.context).run();
		}
	}

	// Send an event as JSON
	transmit(event: any) {
		const connection = PlayStore.getState().connection;

		if (connection) {
			connection.send(event.toJSON());
		}
	}
}
