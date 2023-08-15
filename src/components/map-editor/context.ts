import { MapEntity } from '@/entites/map-entity';
import { Engine } from '@/lib/quill';
import { createContext } from '@/utils/context';

interface EditorContextValue {
	engine: Engine;
	map: MapEntity;
}

export const [EditorContext, useEditorContext] =
	createContext<EditorContextValue>();
