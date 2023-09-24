import { useQuillStore } from '@/lib/quill/store';

export const usePlayStage = () => useQuillStore((state) => state.playStage);
