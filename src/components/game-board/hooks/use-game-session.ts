import { useStoryContext } from '../context';

export const useGameSession = () => {
	return useStoryContext().gameSession;
};
