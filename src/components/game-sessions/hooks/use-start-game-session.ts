import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useInvalidateGameSessions } from '@/api/sessions';
import { Path } from '@/config/routes';
import { GameSession, GameSessionStatus } from '@/entites/game-session';
import { useHttpClient } from '@/lib/http';
import { DynamicPath } from '@/lib/url';

import { useGameSessionName } from './use-game-session-name';

export const useStartGameSession = (session: GameSession) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateGameSessions();
	const name = useGameSessionName(session);
	const navigate = useNavigate();

	return useMutation(
		() => {
			return http.patch(
				new DynamicPath('/game/sessions/:id').for(session).toString(),
				{
					status: GameSessionStatus.Active,
				}
			);
		},
		{
			onSuccess: async () => {
				await invalidate();

				toast({
					title: t('gameSessions.start.title'),
					description: t('gameSessions.start.description', { name }),
					status: 'success',
				});

				navigate(new DynamicPath(Path.GameSession).for(session).toString());
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
