import { AspectRatio, Button, Image, SimpleGrid } from '@chakra-ui/react';
import { pick } from 'ramda';
import { FC } from 'react';

import { TileType, useTileset } from '@/lib/engine/map/hooks/use-tileset';
import { useEditorStore } from '@/lib/engine/store/editor-store';

interface TileSelectorProps {
	type: TileType;
}

export const TileSelector: FC<TileSelectorProps> = ({ type }) => {
	const { beginPlaceFloor, beginPlaceWall, placeTileId } = useEditorStore(
		pick(['beginPlaceFloor', 'beginPlaceWall', 'placeTileId'])
	);
	const tileset = useTileset(type);

	const handleClickTile = (id: string) => {
		if (type === 'floor') {
			return beginPlaceFloor(id);
		}

		if (type === 'wall') {
			return beginPlaceWall(id);
		}
	};

	return (
		<SimpleGrid columns={3} spacing={2} mb={2} minW="15rem">
			{tileset.map((tile) => (
				<Button
					bg="none"
					border="2px solid"
					key={tile.id}
					h="auto"
					p={2}
					onClick={() => handleClickTile(tile.id)}
					_hover={{
						bg: 'gray.700',
					}}
					{...(tile.id === placeTileId && {
						borderColor: 'menu.active',
					})}
				>
					<AspectRatio w="full" ratio={1}>
						<Image
							objectPosition="bottom center"
							src={`/images/${tile.image}`}
						/>
					</AspectRatio>
				</Button>
			))}
		</SimpleGrid>
	);
};
