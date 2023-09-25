import { GameSession } from '@/entites/game-session';
import { Engine } from '@/lib/quill';
import { createContext } from '@/utils/context';

interface StoryContextValue {
	gameSession: GameSession;
	engine: Engine;
}

export const [StoryContext, useStoryContext] =
	createContext<StoryContextValue>();
