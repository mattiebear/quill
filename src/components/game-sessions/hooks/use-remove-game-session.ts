import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useInvalidateGameSessions } from '@/api/game-sessions';
import { GameSession } from '@/entites/game-session';
import { useHttpClient } from '@/lib/http';
import { DynamicPath } from '@/lib/url';

export const useRemoveGameSession = (session: GameSession) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateGameSessions();

	return useMutation(
		() => {
			return http.delete(
				new DynamicPath('/sessions/:id').for(session).toString()
			);
		},
		{
			onSuccess: async () => {
				await invalidate();

				toast({
					title: t('gameSessions.remove.title'),
					description: t('gameSessions.remove.description'),
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
