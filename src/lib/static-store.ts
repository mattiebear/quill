export class StaticStore {
	private static _instance: StaticStore = new StaticStore();
	private _data: any = {};

	constructor() {
		if (StaticStore._instance) {
			throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
		}
		StaticStore._instance = this;
	}

	public static getInstance(): StaticStore {
		return StaticStore._instance;
	}

	public set(key: string, value: any) {
		this._data[key] = value;
	}

	public get(key: string) {
		return this._data[key];
	}
}
