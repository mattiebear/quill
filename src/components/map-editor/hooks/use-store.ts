import { useEditorContext } from '@/components/map-editor/context';

export const useStore = () => {
	return useEditorContext().engine.store;
};
