import { MapEntity } from '@/entites/map-entity';
import { createContext } from '@/utils/context';

interface EditorContextValue {
	map: MapEntity;
}

export const [EditorContext, useEditorContext] =
	createContext<EditorContextValue>();
