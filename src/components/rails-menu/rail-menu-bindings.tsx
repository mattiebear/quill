import { FC, PropsWithChildren, ReactNode } from 'react';

import { useKeyBindings } from './key-bindings/use-key-bindings';

interface RailMenuBindingsProps extends PropsWithChildren {
	items: ReactNode;
}

export const RailMenuBindings: FC<RailMenuBindingsProps> = ({
	children,
	items,
}) => {
	useKeyBindings(items);

	return <>{children}</>;
};
