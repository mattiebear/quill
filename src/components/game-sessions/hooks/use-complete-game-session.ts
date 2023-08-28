import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useInvalidateGameSessions } from '@/api/game-sessions';
import { GameSession, GameSessionStatus } from '@/entites/game-session';
import { useHttpClient } from '@/lib/http';
import { DynamicPath } from '@/lib/url';

export const useCompleteGameSession = (session: GameSession) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateGameSessions();

	return useMutation(
		() => {
			return http.patch(
				new DynamicPath('/game_sessions/:id').for(session).toString(),
				{
					status: GameSessionStatus.Complete,
				}
			);
		},
		{
			onSuccess: async () => {
				await invalidate();

				toast({
					title: t('gameSessions.complete.title'),
					description: t('gameSessions.complete.description'),
					status: 'success',
				});
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
