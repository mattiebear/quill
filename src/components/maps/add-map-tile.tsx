import { AspectRatio, Card, CardBody, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusCircleIcon } from '../icon';

export const AddMapTile: FC = () => {
	const { t } = useTranslation();

	return (
		<Card
			bg="transparent"
			borderColor="button.cta.light"
			borderRadius="3xl"
			borderStyle="solid"
			borderWidth="1px"
			color="button.cta.light"
			transitionDuration="normal"
			transitionProperty="common"
			_hover={{
				borderColor: 'button.cta.active',
				color: 'button.cta.active',
			}}
		>
			<AspectRatio ratio={2 / 3}>
				<CardBody color="inherit">
					<VStack spacing={6}>
						<PlusCircleIcon boxSize={10} color="inherit" />
						<Text color="inherit" textTransform="capitalize">
							{t('maps.newMapLabel')}
						</Text>
					</VStack>
				</CardBody>
			</AspectRatio>
		</Card>
	);
};
