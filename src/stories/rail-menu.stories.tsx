import type { Meta, StoryObj } from '@storybook/react';

import { RailMenu } from '../components/rails-menu';

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
	return <RailMenu>Menu</RailMenu>;
};

export const Primary: Story = {
	render: () => <SimpleMenu />,
};
