import { Flex, Text } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface RailGroupProps extends PropsWithChildren {
	label: string;
}

export const RailGroup: FC<RailGroupProps> = ({ children, label }) => {
	return (
		<Flex direction="column">
			<Text
				color="text.cover.muted"
				fontSize="sm"
				textAlign="center"
				textTransform="uppercase"
			>
				{label}
			</Text>
			{children}
		</Flex>
	);
};
