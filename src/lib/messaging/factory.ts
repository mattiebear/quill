import { AddToken } from '../quill/messages/story/add-token';
import { CurrentStoryState } from '../quill/messages/story/current-story-state';
import { MessageFactory } from './message-factory';

export const factory = new MessageFactory();

factory.register(CurrentStoryState, AddToken);
