import { joinPaths } from '@/utils/path';

interface IDRecord {
	id: string;
}

export class DynamicPath {
	private record?: IDRecord;

	constructor(private readonly path: string) {}

	for<T extends IDRecord>(record: T | string) {
		if (typeof record === 'string') {
			this.record = { id: record };
		} else {
			this.record = record;
		}

		return this;
	}

	toString() {
		const path = this.record
			? this.path.replace(':id', this.record.id)
			: this.path;

		return joinPaths('/', path);
	}
}
