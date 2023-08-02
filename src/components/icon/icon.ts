import { chakra } from '@chakra-ui/react';
import {
	ArrowUturnLeftIcon as ArrowUturnLeftIconBase,
	ArrowUturnRightIcon as ArrowUturnRightIconBase,
	EllipsisHorizontalIcon as EllipsisHorizontalIconBase,
	HomeIcon as HomeIconBase,
	MagnifyingGlassIcon as MagnifyingGlassIconBase,
	MagnifyingGlassMinusIcon,
	MagnifyingGlassPlusIcon,
	MapIcon as MapIconBase,
	PlusCircleIcon as PlusCircleIconBase,
	UserGroupIcon as UserGroupIconBase,
} from '@heroicons/react/24/outline';

// TODO: Figure out a better way todo this
export const ArrowUturnLeftIcon = chakra(ArrowUturnLeftIconBase);
export const ArrowUturnRightIcon = chakra(ArrowUturnRightIconBase);
export const EllipsisHorizontalIcon = chakra(EllipsisHorizontalIconBase);
export const HomeIcon = chakra(HomeIconBase);
export const MagnifyingGlassIcon = chakra(MagnifyingGlassIconBase);
export const MapIcon = chakra(MapIconBase);
export const PlusCircleIcon = chakra(PlusCircleIconBase);
export const UserGroupIcon = chakra(UserGroupIconBase);
export const ZoomOutIcon = chakra(MagnifyingGlassMinusIcon);
export const ZoomInIcon = chakra(MagnifyingGlassPlusIcon);
