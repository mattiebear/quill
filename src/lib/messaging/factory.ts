import { CurrentStoryState } from '../quill/messages/story/current-story-state';
import { MessageFactory } from './message-factory';

export const factory = new MessageFactory();

factory.register(CurrentStoryState);
