export class MessageFactory {
	private messages: any[] = [];

	build(data: { event: string; data: any }) {
		const ctor = this.messages.find((message) => message.name === data.event);

		if (ctor) {
			return ctor.fromJSON(data.data);
		}

		return undefined;
	}

	register(...messages: (new (...args: any[]) => any)[]) {
		this.messages.push(...messages);
	}
}
