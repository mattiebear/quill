import { FC, PropsWithChildren } from 'react';

import { staticStore } from '../store';
import { relay } from './instance';

export const EventProvider: FC<PropsWithChildren> = ({ children }) => {
	staticStore.setState({ relay });

	return <>{children}</>;
};
