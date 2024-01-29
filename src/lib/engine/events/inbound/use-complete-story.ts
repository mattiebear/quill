import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useInvalidateGameSessions } from '@/api/sessions';
import { Path } from '@/config/routes';

import { ReceivedEvent } from '../types';

export type CompleteStoryEvent = ReceivedEvent<'complete-story'>;

export const useCompleteStory = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { t } = useTranslation();
	const invalidate = useInvalidateGameSessions();

	return useCallback(async () => {
		toast({
			title: t('play.complete.successTitle'),
			description: t('play.complete.successDescription'),
			status: 'success',
		});

		await invalidate();

		navigate(Path.GameSessions);
	}, [invalidate, navigate, toast, t]);
};
