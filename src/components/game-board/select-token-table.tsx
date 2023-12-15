import { Table, TableContainer, Tbody } from '@chakra-ui/react';

import { useTokenset } from '@/lib/engine/hooks/use-tokenset';

import { SelectTokenRow } from './select-token-row';

export const SelectTokenTable = () => {
	const tokens = useTokenset();

	return (
		<TableContainer color="text.table" w="full">
			<Table variant="simple">
				<Tbody>
					{tokens.map((token) => {
						return <SelectTokenRow key={token.id} token={token} />;
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
