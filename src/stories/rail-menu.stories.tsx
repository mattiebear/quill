import type { Meta, StoryObj } from '@storybook/react';

import { BookOpenIcon, HomeIcon } from '@/components/icon';

import {
	RailMenu,
	RailMenuFrame,
	RailMenuItem,
} from '../components/rails-menu';

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
		<RailMenu>
			<RailMenuItem icon={<BookOpenIcon />} label="Read" />
			<RailMenuItem icon={<HomeIcon />} label="Home" />

			{/* <RailMenuItem icon={<BookOpenIcon />} label="More">
					<RailMenuItem icon={<BookOpenIcon />} label="Read" />
					<RailMenuItem icon={<HomeIcon />} label="Home" />

					<RailMenuItem icon={<BookOpenIcon />} label="Open">
						<RailMenuContent>
							
						</RailMenuContent>
					</RailMenuItem>
			</RailMenuItem> */}
		</RailMenu>
	);
};

export const Primary: Story = {
	render: () => <SimpleMenu />,
};
