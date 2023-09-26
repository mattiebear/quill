import { GameSession } from '@/entites/game-session';
import { createContext } from '@/utils/context';

interface StoryContextValue {
	gameSession: GameSession;
}

export const [StoryContext, useStoryContext] =
	createContext<StoryContextValue>();
