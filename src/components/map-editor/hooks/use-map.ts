import { useEditorContext } from '@/components/map-editor/context';

export const useMap = () => {
	return useEditorContext().map;
};
