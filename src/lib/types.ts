export interface RequestData {
	model: string;
	password: string;
	messages: Message[];
}

export interface Message {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

export interface Config {
	password: string;
	system: string;
	pattern: string;
	advanced: boolean;
}
