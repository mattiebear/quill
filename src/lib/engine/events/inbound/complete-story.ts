export class CompleteStory {
	public static event = 'complete-story';

	constructor(private context: any) {}

	async run() {
		console.log('complete story');
		// FIXME: Navigate to the story index
	}
}
