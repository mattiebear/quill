import { useEditorContext } from '@/components/map-editor/context';

export const useIO = () => {
	return useEditorContext().engine.io;
};
