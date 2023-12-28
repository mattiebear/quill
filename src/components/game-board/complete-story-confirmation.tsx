import { Portal } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PlayStore, usePlayStore } from '@/lib/engine/store/play-store';

import { ConfirmationDialogue } from '../confirmation';
import { useCompleteStory } from './hooks/use-complete-story';

export const CompleteStoryConfirmation: FC = () => {
	const isOpen = usePlayStore((state) => state.isConfirmCompleteOpen);
	const { t } = useTranslation();
	const { isLoading, mutate } = useCompleteStory();

	const handleClickClose = () => {
		if (!isLoading) {
			PlayStore.setState({ isConfirmCompleteOpen: false });
		}
	};

	return (
		<Portal>
			<ConfirmationDialogue
				title={t('play.complete.confirmTitle')}
				description={t('play.complete.confirmDescription')}
				cancelText={t('play.complete.confirmCancel')}
				acceptText={t('play.complete.confirmAccept')}
				onAccept={mutate}
				colorScheme="red"
				isLoading={isLoading}
				isOpen={isOpen}
				onClose={handleClickClose}
			/>
		</Portal>
	);
};
