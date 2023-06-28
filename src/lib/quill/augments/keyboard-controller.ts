// import { Relay } from '@/lib/quill/core/relay';

// class Channeler {
// constructor(private event: string) {}
//
// whileKeyDown(key: string) {
// 	return this;
// }
//
// to(relay: Relay) {
// 	return this;
// }
// }

export class KeyboardController {
	constructor() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	destroy() {
		console.log('destroyed here');
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	private handleKeyDown = (e: KeyboardEvent) => {
		console.log(e.key);
	};

	// channel(event: string) {
	// 	return new Channeler(event);
	// }
	//
}
