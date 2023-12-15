import { Button, HStack, Spacer, Td, Text, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { TokenSchema } from '@/lib/engine/hooks/use-tokenset';
import { usePlayStore } from '@/lib/engine/store/play-store';

interface SelectTokenRowProps {
	token: TokenSchema;
}

export const SelectTokenRow: FC<SelectTokenRowProps> = ({ token }) => {
	const { t } = useTranslation();
	const beginPlaceToken = usePlayStore((state) => state.beginPlaceToken);

	return (
		<Tr>
			<Td pl={0}>
				<Text fontWeight="medium">Token {token.id}</Text>
			</Td>

			<Td pr={0}>
				<HStack>
					<Spacer />
					<Button
						colorScheme="purple"
						onClick={() => beginPlaceToken(token.id)}
						size="sm"
					>
						{t('common.select')}
					</Button>
				</HStack>
			</Td>
		</Tr>
	);
};
