import { AspectRatio, Box, Button, SimpleGrid } from '@chakra-ui/react';
import { pick } from 'ramda';
import { FC } from 'react';

import { useTokenset } from '@/lib/engine/map/hooks/use-tokenset';
import { usePlayStore } from '@/lib/engine/store/play-store';

export const TokenSelector: FC = () => {
	const { beginPlaceToken, placeTokenId } = usePlayStore(
		pick(['beginPlaceToken', 'placeTokenId'])
	);
	const tokens = useTokenset();

	return (
		<SimpleGrid columns={3} spacing={2} mb={2} minW="15rem">
			{tokens.map((token) => (
				<Button
					bg="none"
					border="2px solid"
					key={token.id}
					h="auto"
					p={2}
					onClick={() => beginPlaceToken(token.id)}
					_hover={{
						bg: 'gray.700',
					}}
					{...(token.id === placeTokenId && {
						borderColor: 'menu.active',
					})}
				>
					<AspectRatio w="full" ratio={1}>
						<Box boxSize="full" bg="green.700" />
					</AspectRatio>
				</Button>
			))}
		</SimpleGrid>
	);
};
