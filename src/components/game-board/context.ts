import { Engine } from '@/lib/quill';
import { createContext } from '@/utils/context';

interface StoryContextValue {
	engine: Engine;
}

export const [StoryContext, useStoryContext] =
	createContext<StoryContextValue>();
