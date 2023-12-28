import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Path } from '@/config/routes';

import { ReceivedEvent } from '../types';

export type CompleteStoryEvent = ReceivedEvent<'complete-story'>;

export const useCompleteStory = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { t } = useTranslation();

	return useCallback(() => {
		toast({
			title: t('play.complete.successTitle'),
			description: t('play.complete.successDescription'),
			status: 'success',
		});

		navigate(Path.GameSessions);
	}, [navigate, toast, t]);
};
