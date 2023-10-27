import { createContext, Provider, useContext } from 'react';

export const createBoundContext = <T = any>({
	defaultValue,
}: {
	defaultValue: T;
}): [Provider<T>, () => T] => {
	const context = createContext<T>(defaultValue);

	const useHook = () => {
		return useContext(context);
	};

	return [context.Provider, useHook];
};
