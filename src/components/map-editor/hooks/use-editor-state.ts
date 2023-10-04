import { useQuillStore } from '@/lib/quill/store';

export const useEditorState = () => {
	return useQuillStore(({ selectedBlueprint, selectedDirection }) => ({
		selectedBlueprint,
		selectedDirection,
	}));
};
