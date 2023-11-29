import {
	JsonObject,
	JsonProperty,
	PropertyConvertingMode,
} from 'json2typescript';

import { Atlas } from '@/entites/atlas';

@JsonObject('MapEntity')
export class MapEntity {
	@JsonProperty('id', String)
	id = '';

	@JsonProperty('name', String)
	name = '';

	@JsonProperty('userId', String)
	userId = '';

	@JsonProperty('atlas', Atlas, PropertyConvertingMode.IGNORE_NULLABLE)
	atlas: Atlas = {
		version: '1',
		data: {},
	};
}
