import { Flex, Text } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface RailGroupProps extends PropsWithChildren {
	title: string;
}

export const RailGroup: FC<RailGroupProps> = ({ children, title }) => {
	return (
		<Flex direction="column">
			<Text
				color="text.cover.muted"
				fontSize="sm"
				textAlign="center"
				textTransform="uppercase"
			>
				{title}
			</Text>
			{children}
		</Flex>
	);
};
