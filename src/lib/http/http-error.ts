interface HttpErrorData {
	message?: string;
	data: Record<string, string>[];
}

interface HttpErrorResponse {
	response: {
		data: HttpErrorData;
	};
}

export const isRecordObject = (
	object: unknown
): object is Record<string, unknown> => {
	return !!object && typeof object === 'object';
};

export const isHttpErrorResponse = (
	object: unknown
): object is HttpErrorResponse => {
	return (
		isRecordObject(object) &&
		'response' in object &&
		isRecordObject(object.response) &&
		'data' in object.response &&
		isRecordObject(object.response.data) &&
		'data' in object.response.data &&
		Array.isArray(object.response.data.data)
	);
};

export const getHttpError = (error: HttpErrorResponse) => {
	return new HttpError(error.response.data);
};

export class HttpError {
	constructor(public error: HttpErrorData) {}

	get message() {
		return this.error.message;
	}

	each(callback: (location: string, code: string) => void) {
		for (const { location, code } of this.error.data) {
			callback(location, code);
		}
	}
}
