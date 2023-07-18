import { chakra } from '@chakra-ui/react';
import {
	ArrowUturnLeftIcon as ArrowUturnLeftIconBase,
	ArrowUturnRightIcon as ArrowUturnRightIconBase,
	HomeIcon as HomeIconBase,
	MagnifyingGlassMinusIcon,
	MagnifyingGlassPlusIcon,
	MapIcon as MapIconBase,
	PlusCircleIcon as PlusCircleIconBase,
} from '@heroicons/react/24/outline';

// TODO: Figure out a better way todo this
export const ArrowUturnLeftIcon = chakra(ArrowUturnLeftIconBase);
export const ArrowUturnRightIcon = chakra(ArrowUturnRightIconBase);
export const HomeIcon = chakra(HomeIconBase);
export const MapIcon = chakra(MapIconBase);
export const PlusCircleIcon = chakra(PlusCircleIconBase);
export const ZoomOutIcon = chakra(MagnifyingGlassMinusIcon);
export const ZoomInIcon = chakra(MagnifyingGlassPlusIcon);
