import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';

interface ConfirmationDialogueProps {
	title: string;
	description: string;
	cancelText: string;
	acceptText: string;
	onAccept: VoidFunction;
	colorScheme: string;
	isOpen: boolean;
	onClose: VoidFunction;
	isLoading?: boolean;
}

export const ConfirmationDialogue: FC<ConfirmationDialogueProps> = ({
	title,
	description,
	cancelText,
	acceptText,
	onAccept,
	colorScheme,
	isOpen,
	isLoading,
	onClose,
}) => {
	const closeRef = useRef<HTMLButtonElement>(null);

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={closeRef}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent bg="background.cover" color="text.cover.focus">
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{title}
					</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>{description}</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={closeRef} onClick={onClose} isDisabled={isLoading}>
							{cancelText}
						</Button>
						<Button
							colorScheme={colorScheme}
							onClick={onAccept}
							ml={3}
							isLoading={isLoading}
						>
							{acceptText}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};
