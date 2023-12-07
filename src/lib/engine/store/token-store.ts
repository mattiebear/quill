import { produce } from 'immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Token } from '../map';
import { replaceOrAdd } from './utils/replace-or-add';

export interface TokenStoreValues {
	tokens: Token[];
	placeToken: (token: Token) => void;
}

const TokenStore = createWithEqualityFn<TokenStoreValues>(
	(set) => ({
		tokens: [],
		// TODO: Maybe have this in a separate hook
		placeToken: (token: Token) => {
			set(
				produce<TokenStoreValues>((state) => {
					replaceOrAdd(state.tokens, token);
				})
			);
		},
	}),
	shallow
);

const defaultState = TokenStore.getState();

const resetTokenStore = () => {
	TokenStore.setState(defaultState, true);
};

const useTokenStore = TokenStore;

export { resetTokenStore, TokenStore, useTokenStore };
