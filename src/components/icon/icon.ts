import { chakra } from '@chakra-ui/react';
import {
	HomeIcon as HomeIconBase,
	MagnifyingGlassMinusIcon,
	MagnifyingGlassPlusIcon,
	MapIcon as MapIconBase,
	PlusCircleIcon as PlusCircleIconBase,
} from '@heroicons/react/24/outline';

export const HomeIcon = chakra(HomeIconBase);
export const MapIcon = chakra(MapIconBase);
export const PlusCircleIcon = chakra(PlusCircleIconBase);
export const ZoomOutIcon = chakra(MagnifyingGlassMinusIcon);
export const ZoomInIcon = chakra(MagnifyingGlassPlusIcon);
