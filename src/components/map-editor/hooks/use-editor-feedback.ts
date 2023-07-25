import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const useEditorFeedback = () => {
	const toast = useToast();
	const { t } = useTranslation();

	const createSaveToast = () => {
		toast({
			status: 'success',
			title: t('editor.mapSaved'),
			duration: 2000,
		});
	};

	return { createSaveToast };
};
