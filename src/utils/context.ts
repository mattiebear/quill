import {
	Context,
	Provider,
	createContext as createBaseContext,
	useContext as useBaseContext,
} from 'react';

interface CreateContextOptions<T> {
	defaultValue?: T;
}

export const createContext = <T = any>({
	defaultValue,
}: CreateContextOptions<T> = {}) => {
	const Context = createBaseContext(defaultValue);

	const useContext = () => useBaseContext(Context) as T;

	return [Context.Provider, useContext, Context] as [
		Provider<T>,
		() => T,
		Context<T>
	];
};
