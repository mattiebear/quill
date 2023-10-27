import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import {
	BookOpenIcon,
	HomeIcon,
	MapIcon,
	PlusCircleIcon,
} from '@/components/icon';

import { RailMenu, RailMenuItem } from '../components/rails-menu';

const meta = {
	title: 'Components/RailMenu',
	component: RailMenu,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof RailMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const SimpleMenu = () => {
	return (
		<Box h="15rem">
			<RailMenu>
				<RailMenuItem icon={<HomeIcon />} label="Home" />
				<RailMenuItem icon={<BookOpenIcon />} label="Read" />
				<RailMenuItem icon={<MapIcon />} label="Maps" />
				<RailMenuItem icon={<PlusCircleIcon />} label="Actions">
					<RailMenuItem icon={<HomeIcon />} label="Home" />
					<RailMenuItem icon={<BookOpenIcon />} label="Read" />
					<RailMenuItem icon={<MapIcon />} label="Maps" />

					<RailMenuItem icon={<PlusCircleIcon />} label="Actions">
						<RailMenuItem icon={<HomeIcon />} label="Home" />
						<RailMenuItem icon={<BookOpenIcon />} label="Read" />
						<RailMenuItem icon={<MapIcon />} label="Maps" />
					</RailMenuItem>
				</RailMenuItem>
			</RailMenu>
		</Box>
	);
};

export const Primary: Story = {
	render: () => <SimpleMenu />,
};
