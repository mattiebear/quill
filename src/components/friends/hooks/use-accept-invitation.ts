import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useInvalidateConnections } from '@/api/connections';
import { Connection } from '@/entites/connection';
import { useHttpClient } from '@/lib/http';
import { DynamicPath } from '@/lib/url';
import { ConnectionDetailData, ConnectionStatus } from '@/types/connection';

export const useAcceptInvitation = (connection: Connection) => {
	const { t } = useTranslation();
	const http = useHttpClient();
	const toast = useToast();
	const invalidate = useInvalidateConnections();

	return useMutation(
		() => {
			return http.patch<ConnectionDetailData>(
				new DynamicPath('/connections/:id').for(connection).toString(),
				{ status: ConnectionStatus.Accepted }
			);
		},
		{
			onSuccess: async () => {
				await invalidate();

				toast({
					title: t('friends.connection.accept.title'),
					description: t('friends.connection.accept.description'),
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
