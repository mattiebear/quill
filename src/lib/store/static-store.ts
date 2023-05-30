type Listener = (value: any) => void;

export class StaticStore {
	private static _instance: StaticStore;
	private _data: Map<string, any> = new Map();
	private _subscriptions: Map<string, Listener[]> = new Map();

	// Instance methods
	get<T>(key: string): T {
		return this._data.get(key);
	}

	set<T>(key: string, value: T): void {
		this._data.set(key, value);

		const subs = this._subscriptions.get(key) || [];

		subs.forEach((listener) => {
			listener(value);
		});

		this._subscriptions.set(key, []);
	}

	has(key: string): boolean {
		return this._data.has(key);
	}

	subscribe<T>(key: string, listener: (value: T) => void): void {
		const subs = this._subscriptions.get(key) || [];
		this._subscriptions.set(key, [...subs, listener]);
	}

	// Static methods
	private static getInstance(): StaticStore {
		if (!StaticStore._instance) {
			StaticStore._instance = new StaticStore();
		}

		return StaticStore._instance;
	}

	public static get<T>(key: string): T {
		return StaticStore.getInstance().get(key);
	}

	public static set<T>(key: string, value: T): void {
		StaticStore.getInstance().set(key, value);
	}

	public static fetch<T>(key: string): Promise<T> {
		return new Promise((resolve) => {
			const instance = StaticStore.getInstance();

			if (instance.has(key)) {
				resolve(instance.get(key));
			} else {
				instance.subscribe(key, (value: T) => {
					resolve(value);
				});
			}
		});
	}
}
