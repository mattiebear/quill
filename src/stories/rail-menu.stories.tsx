import { Box, Button } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import {
	BookOpenIcon,
	HomeIcon,
	MapIcon,
	PlusCircleIcon,
	TrashIcon,
} from '@/components/icon';

import {
	RailMenu,
	RailMenuContent,
	RailMenuItem,
} from '../components/rail-menu';

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

const onSelect = (action?: string) => {
	console.log('action:', action);
};

const SimpleMenu = () => {
	return (
		<Box h="15rem">
			<RailMenu onSelect={onSelect}>
				<RailMenuItem icon={<HomeIcon />} label="Home" keyBinding="C" />
				<RailMenuItem action="read" icon={<BookOpenIcon />} label="Read" />
				<RailMenuItem icon={<MapIcon />} label="Maps" />
				<RailMenuItem icon={<PlusCircleIcon />} label="Actions">
					<RailMenuItem icon={<HomeIcon />} label="Home" />
					<RailMenuItem icon={<BookOpenIcon />} label="Read" />
					<RailMenuItem icon={<MapIcon />} label="Maps" keyBinding="A" />

					<RailMenuItem icon={<PlusCircleIcon />} label="Actions">
						<RailMenuItem icon={<HomeIcon />} label="Home" />
						<RailMenuItem icon={<BookOpenIcon />} label="Read" />
						<RailMenuItem icon={<MapIcon />} label="Maps" />
					</RailMenuItem>

					<RailMenuItem
						action="stuff"
						icon={<TrashIcon />}
						label="Stuff"
						keyBinding="Z"
					>
						<RailMenuContent>
							<Button>Other stuff</Button>
						</RailMenuContent>
					</RailMenuItem>
				</RailMenuItem>
			</RailMenu>
		</Box>
	);
};

export const Primary: Story = {
	render: () => <SimpleMenu />,
};
