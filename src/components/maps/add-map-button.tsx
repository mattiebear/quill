import { AspectRatio, Card, CardBody, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusCircleIcon } from '../icon';

export const AddMapButton: FC = () => {
	const { t } = useTranslation();

	return (
		<Card
			bg="transparent"
			borderWidth="1px"
			borderStyle="solid"
			borderColor="button.cta.light"
			color="button.cta.light"
			transitionDuration="normal"
			transitionProperty="common"
			_hover={{
				borderColor: 'button.cta.active',
				color: 'button.cta.active',
			}}
		>
			<CardBody color="inherit">
				<AspectRatio ratio={2 / 3}>
					<VStack spacing={6}>
						<PlusCircleIcon boxSize={10} color="inherit" />
						<Text color="inherit" textTransform="capitalize">
							{t('maps.newMapLabel')}
						</Text>
					</VStack>
				</AspectRatio>
			</CardBody>
		</Card>
	);
};
