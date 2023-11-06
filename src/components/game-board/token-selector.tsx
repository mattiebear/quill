import { AspectRatio, Button, Image, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';

import { useTokenset } from '@/lib/quill/hooks/use-tokenset';

import { usePlaceTokenAction } from './hooks/use-place-token-action';

export const TokenSelector: FC = () => {
	const { action, selectToken } = usePlaceTokenAction();
	const tokenset = useTokenset();

	return (
		<SimpleGrid columns={3} spacing={2} mb={2} minW="15rem">
			{tokenset.all.map((token) => (
				<Button
					bg="none"
					border="2px solid"
					key={token.id}
					h="auto"
					p={2}
					onClick={() => selectToken(token.id)}
					_hover={{
						bg: 'gray.700',
					}}
					{...(token.id === action.id && {
						borderColor: 'menu.active',
					})}
				>
					<AspectRatio w="full" ratio={1}>
						<Image objectPosition="bottom center" src={token.iconSrc} />
					</AspectRatio>
				</Button>
			))}
		</SimpleGrid>
	);
};
