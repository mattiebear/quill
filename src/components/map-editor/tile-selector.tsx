import { AspectRatio, Button, Image, SimpleGrid } from '@chakra-ui/react';
import { pick } from 'ramda';
import { FC } from 'react';

import { useEditorStore } from '@/lib/engine/store/editor-store';

import { useTileset } from './hooks/use-tileset';

interface TileSelectorProps {
	// TODO: Scope to allowed types
	type: string;
}

export const TileSelector: FC<TileSelectorProps> = () => {
	const { beginPlaceFloor, placeTileId } = useEditorStore(
		pick(['beginPlaceFloor', 'placeTileId'])
	);
	const tileset = useTileset();

	return (
		<SimpleGrid columns={3} spacing={2} mb={2} minW="15rem">
			{tileset.map((tile) => (
				<Button
					bg="none"
					border="2px solid"
					key={tile.id}
					h="auto"
					p={2}
					onClick={() => beginPlaceFloor(tile.id)}
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
