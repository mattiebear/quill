import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { GameSession, GameSessionStatus } from '@/entites/game-session';
import { useHttpClient } from '@/lib/http';
import { DynamicPath } from '@/lib/url';

interface Options {
	onSuccess?: VoidFunction;
}

export const useCompleteGameSession = (
	session: GameSession,
	{ onSuccess }: Options = {}
) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();

	return useMutation(
		() => {
			return http.patch(
				new DynamicPath('/sessions/:id').for(session).toString(),
				{
					status: GameSessionStatus.Complete,
				}
			);
		},
		{
			onSuccess: async () => {
				onSuccess?.();
			},
			onError: () => {
				toast({
					description: t('common.unknownError'),
					status: 'error',
				});
			},
		}
	);
};
