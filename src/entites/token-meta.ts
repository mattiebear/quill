import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('TokenMeta')
export class TokenMeta {
	@JsonProperty('id', String)
	id = '';

	get frameSrc() {
		return `/images/tokens/${this.id}-frame.jpg`;
	}

	get iconSrc() {
		return `/images/tokens/${this.id}-icon.jpg`;
	}
}
