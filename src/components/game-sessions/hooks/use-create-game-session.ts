import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useInvalidateGameSessions } from '@/api/game-sessions';
import { getHttpError, isHttpErrorResponse, useHttpClient } from '@/lib/http';

interface FormState {
	name: string;
	userIds: string[];
}

export const useCreateGameSession = ({
	onSuccess,
}: {
	onSuccess?: VoidFunction;
}) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateGameSessions();

	return useMutation(
		(data: FormState) => {
			return http.post('/sessions', data);
		},
		{
			onSuccess: async () => {
				await invalidate();

				toast({
					title: t('gameSessions.create.successTitle'),
					description: t('gameSessions.create.successDescription'),
					status: 'success',
				});

				onSuccess?.();
			},
			onError: (err) => {
				if (isHttpErrorResponse(err)) {
					getHttpError(err).each((location, code) => {
						console.log({ location, code });

						toast({
							description: t(`gameSessions.create.error.${location}`, {
								context: code,
								defaultValue: t('common.unknownError'),
							}),
							status: 'error',
						});
					});
				}
			},
		}
	);
};
