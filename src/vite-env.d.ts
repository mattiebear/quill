/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_API_BASE_URL: string;
	readonly VITE_APP_CLERK_PUBLISHABLE_KEY: string;
	readonly VITE_APP_WEBSOCKET_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
