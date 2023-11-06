import { AspectRatio, Button, Image, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';

import { TileType } from '@/lib/quill';
import { useTileset } from '@/lib/quill/hooks/use-tileset';

import { usePlaceTileAction } from './hooks/use-place-tile-action';

interface TileSelectorProps {
	type: TileType;
}

export const TileSelector: FC<TileSelectorProps> = ({ type }) => {
	const { action, selectTile } = usePlaceTileAction();
	const tileset = useTileset(type);

	return (
		<SimpleGrid columns={3} spacing={2} mb={2} minW="15rem">
			{tileset.all.map((blueprint) => (
				<Button
					bg="none"
					border="2px solid"
					key={blueprint.id}
					h="auto"
					p={2}
					onClick={() => selectTile(blueprint.id)}
					_hover={{
						bg: 'gray.700',
					}}
					{...(blueprint.id === action.id && {
						borderColor: 'menu.active',
					})}
				>
					<AspectRatio w="full" ratio={1}>
						<Image
							objectPosition="bottom center"
							src={blueprint.sprite.source(action.direction)}
						/>
					</AspectRatio>
				</Button>
			))}
		</SimpleGrid>
	);
};
