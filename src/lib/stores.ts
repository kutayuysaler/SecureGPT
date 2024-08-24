import { writable } from 'svelte/store';
import type { Config, Message } from './types';

export const messages = writable<Message[]>([]);
export const config = writable<Config>({
	password: '',
	system: 'You are a kind and helpful AI Business Assistant',
	pattern: 'Neutral',
	advanced: false
});
export const latestAiResponse = writable<string | null>(null);
