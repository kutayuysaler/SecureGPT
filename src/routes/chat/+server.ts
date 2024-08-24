import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import OpenAI from 'openai';
import type { RequestData } from '../../lib/types.js';

const openai = new OpenAI({
	apiKey: env.OPEN_AI_KEY
});

export async function POST({ request }) {
	const chat = (await request.json()) as RequestData;

	if (chat.password !== env.PASSWORD) throw error(401, 'Unauthorized');

	// TODO: handle errors
	const response = await openai.chat.completions.create({
		messages: chat.messages,
		model: chat.model,
		stream: true
	});

	return new Response(response.toReadableStream(), {
		headers: {
			'content-type': 'text/event-stream'
		}
	});
}
