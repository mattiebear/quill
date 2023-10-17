import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useEditorFeedback = () => {
	const toast = useToast();
	const { t } = useTranslation();

	const createSaveToast = useCallback(() => {
		toast({
			status: 'success',
			title: t('editor.mapSaved'),
			duration: 2000,
		});
	}, [t, toast]);

	return { createSaveToast };
};
