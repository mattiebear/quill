import { JsonObject, JsonProperty } from 'json2typescript';
import { pick } from 'ramda';

@JsonObject('User')
export class User {
	constructor(data: any = {}) {
		Object.assign(this, pick(['id', 'imageUrl', 'username'], data));
	}

	@JsonProperty('id', String)
	id = '';

	@JsonProperty('imageUrl', String)
	imageUrl: string;

	@JsonProperty('username', String)
	username: string;
}
