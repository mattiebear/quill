import { Children, isValidElement, ReactNode } from 'react';

type Binding = {
	action?: string;
	location: number[];
};

export const mapMenuItemKeyBindings = (children: ReactNode) => {
	const bindings: Record<string, Binding> = {};

	const getBindings = (children: ReactNode, location: number[] = []) => {
		Children.toArray(children).forEach((child, index) => {
			if (isValidElement(child)) {
				const childLocation = location.concat(index);

				if ('keyBinding' in child.props) {
					Object.assign(bindings, {
						[child.props.keyBinding.toLowerCase()]: {
							action: child.props.action,
							location: childLocation,
						},
					});
				}

				if ('children' in child.props) {
					getBindings(child.props.children, childLocation);
				}
			}
		});
	};

	getBindings(children);

	return bindings;
};
