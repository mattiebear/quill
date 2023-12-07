import { EventManager } from './event-manager';
import { AddToken } from './inbound/add-token';
import { CurrentStoryState } from './inbound/current-story-state';

// TODO: Make this accessible via static state
export const eventManager = new EventManager();

eventManager.register(AddToken, CurrentStoryState);
