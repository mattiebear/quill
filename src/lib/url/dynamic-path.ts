interface IDRecord {
	id: string;
}

export class DynamicPath {
	private _record?: IDRecord;
	private _path: string;

	constructor(path: string) {
		this._path = path;
	}

	for<T extends IDRecord>(record: T | string) {
		if (typeof record === 'string') {
			this._record = { id: record };
		} else {
			this._record = record;
		}

		return this;
	}

	toString() {
		const path = this._record
			? this._path.replace(':id', this._record.id)
			: this._path;
		return this.cleanPath(path);
	}

	private cleanPath(path: string) {
		return '/' + path.replaceAll(/(^\/|\/$)/g, '');
	}
}
