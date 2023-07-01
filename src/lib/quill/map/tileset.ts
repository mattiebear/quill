import { DirectionalSprite, TileBlueprint } from '@/lib/quill';
import { TileSchema } from '@/lib/quill/types/map';
import { joinPaths } from '@/utils/path';

interface FromOptions {
	imageBaseURL?: string;
}

/**
 * A collection of all tiles available to be placed in the map. Tile blueprint instances are linked to
 * metadata such as a name and tags for use throughout the UI
 */
export class Tileset {
	private tiles = new Map<string, TileBlueprint>();

	add(blueprint: TileBlueprint) {
		this.tiles.set(blueprint.id, blueprint);
	}

	get(id: string) {
		return this.tiles.get(id);
	}

	static from(manifest: TileSchema[], options: FromOptions = {}) {
		const { imageBaseURL = '/' } = options;
		const tileset = new Tileset();

		manifest.forEach(({ id, image, type }) => {
			const imageURL = joinPaths('/', imageBaseURL, image),
				sprite = DirectionalSprite.from(imageURL),
				blueprint = new TileBlueprint(id, type, sprite);

			tileset.add(blueprint);
		});

		return tileset;
	}
}
