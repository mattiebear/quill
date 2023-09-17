import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('User')
export class User {
	constructor(data: any = {}) {
		Object.assign(this, {
			id: data.id,
			imageUrl: data.imageUrl,
			username: data.username,
		});
	}

	@JsonProperty('id', String)
	id = '';

	@JsonProperty('imageUrl', String)
	imageUrl: string;

	@JsonProperty('username', String)
	username: string;
}
