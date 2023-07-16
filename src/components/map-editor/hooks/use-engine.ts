import { useEditorContext } from '@/components/map-editor/context';

export const useEngine = () => {
	return useEditorContext().engine;
};
