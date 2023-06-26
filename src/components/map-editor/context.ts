import { Engine } from '@/lib/quill';
import { createContext } from '@/utils/context';

interface EditorContextValue {
	engine: Engine;
}

export const [EditorContext, useEditorContext] =
	createContext<EditorContextValue>();
