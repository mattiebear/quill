import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

// import { useInvalidateConnections } from '@/api/connections';
import { getHttpError, isHttpErrorResponse, useHttpClient } from '@/lib/http';

interface FormState {
	name: string;
	userIds: string[];
}

export const useCreatePlaySession = ({
	onSuccess,
}: {
	onSuccess?: VoidFunction;
}) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();
	// const invalidate = useInvalidateConnections();

	return useMutation(
		(data: FormState) => {
			return http.post('/game_sessions', data);
		},
		{
			onSuccess: async (_data, form) => {
				// await invalidate();

				toast({
					title: t('playSessions.create.successTitle'),
					description: t('playSessions.create.successDescription'),
					status: 'success',
				});

				onSuccess?.();
			},
			onError: (err) => {
				if (isHttpErrorResponse(err)) {
					getHttpError(err).each((location, code) => {
						console.log({ location, code });

						toast({
							description: t(`playSessions.create.error.${location}`, {
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
