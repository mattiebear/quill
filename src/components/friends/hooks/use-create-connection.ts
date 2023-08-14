import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useInvalidateConnections } from '@/api/connections';
import { getHttpError, isHttpErrorResponse, useHttpClient } from '@/lib/http';

interface FormState {
	username: string;
}

export const useCreateConnection = ({
	onSuccess,
}: {
	onSuccess?: VoidFunction;
}) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateConnections();

	return useMutation(
		(data: FormState) => {
			return http.post('/connections', data);
		},
		{
			onSuccess: async (_data, form) => {
				await invalidate();

				toast({
					title: t('friends.create.successTitle'),
					description: t('friends.create.successDescription', {
						name: form.username,
					}),
					status: 'success',
				});

				onSuccess?.();
			},
			onError: (err) => {
				if (isHttpErrorResponse(err)) {
					getHttpError(err).each((location, code) => {
						console.log({ location, code });

						toast({
							description: t(`friends.create.error.${location}`, {
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
