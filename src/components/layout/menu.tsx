import { Box, Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../navbar';

export const MenuLayout: FC = () => {
	return (
		<Grid bg="background.base" h="full" p={2} templateColumns="6rem 1fr">
			<Navbar />

			<Box as="main">
				<Outlet />
			</Box>
		</Grid>
	);
};
