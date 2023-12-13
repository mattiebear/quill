import { produce } from 'immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { GridPosition, Token } from '../map';
import { replaceOrAdd } from './utils/replace-or-add';

export interface TokenStoreValues {
	tokens: Token[];
	moveToken: (tokenId: string, pos: GridPosition) => void;
	placeToken: (token: Token) => void;
	removeToken: (id: string) => void;
}

const TokenStore = createWithEqualityFn<TokenStoreValues>(
	(set) => ({
		tokens: [],
		moveToken: (tokenId: string, pos: GridPosition) => {
			set(
				produce<TokenStoreValues>((state) => {
					// For some reason we need to clone the token here. The renderer was not updating
					// when we simply changed the position of the token in the array.
					const index = state.tokens.findIndex((t) => t.id === tokenId);

					if (index !== -1) {
						const token = state.tokens[index].clone();
						token.position = pos;
						state.tokens[index] = token;
					}
				})
			);
		},
		placeToken: (token: Token) => {
			set(
				produce<TokenStoreValues>((state) => {
					replaceOrAdd(state.tokens, token);
				})
			);
		},
		removeToken: (id: string) => {
			set(
				produce<TokenStoreValues>((state) => {
					const index = state.tokens.findIndex((t) => t.id === id);

					if (index !== -1) {
						state.tokens.splice(index, 1);
					}
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
