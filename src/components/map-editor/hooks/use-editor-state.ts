import { useQuillStore } from '@/lib/quill/store';

export const useEditorState = () => {
	return useQuillStore((state) => ({
		blueprintId: state.selectedBlueprint,
		direction: state.selectedDirection,
	}));
};
