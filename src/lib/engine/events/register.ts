import { EventManager } from './event-manager';
import { CurrentStoryState } from './inbound/current-story-state';

export const eventManager = new EventManager();

eventManager.register(CurrentStoryState);
