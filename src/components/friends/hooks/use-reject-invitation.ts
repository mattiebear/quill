import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useInvalidateConnections } from '@/api/connections';
import { Connection } from '@/entites/connection';
import { useHttpClient } from '@/lib/http';
import { DynamicPath } from '@/lib/url';
import { ConnectionDetailData } from '@/types/connection';

export const useRejectInvitation = (connection: Connection) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateConnections();

	return useMutation(
		() => {
			return http.delete<ConnectionDetailData>(
				new DynamicPath('/connections/:id').for(connection).toString()
			);
		},
		{
			onSuccess: async () => {
				await invalidate();

				toast({
					title: t('friends.connection.reject.title'),
					description: t('friends.connection.reject.description'),
					status: 'info',
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
