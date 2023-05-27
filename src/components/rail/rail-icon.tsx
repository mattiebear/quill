import { AspectRatio } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const RailIcon: FC<PropsWithChildren> = ({ children }) => {
	return (
		<AspectRatio maxW="full" ratio={1}>
			{children}
		</AspectRatio>
	);
};
