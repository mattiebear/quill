export class Application {
	static get env() {
		return import.meta.env.MODE;
	}

	static isDevelopment() {
		return this.env === 'development';
	}

	static isProduction() {
		return this.env === 'production';
	}

	static get ApiBaseURL() {
		return import.meta.env.VITE_APP_API_BASE_URL;
	}

	static get AuthServiceKey() {
		return import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;
	}

	static get WebsocketURL() {
		return import.meta.env.VITE_APP_WEBSOCKET_URL;
	}
}
