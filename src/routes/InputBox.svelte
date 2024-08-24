<script lang="ts">
	import { get } from 'svelte/store';
	import { config as configStore, latestAiResponse, messages } from '$lib/stores';
	import type { Message, RequestData } from '$lib/types';
	import { refineInput } from '$lib/refineInput';

	import sendImage from '$lib/assets/send.svg';
	import { onMount } from 'svelte';

	let stopSubmission = false;
	let wasUnauthorized = false;

	onMount(() => {
		const textAreaElement = document.getElementById('user-input') as HTMLDivElement;
		textAreaElement.addEventListener('keypress', (e) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				onSubmit();
				e.preventDefault();
			}
		});

		// textAreaElement.addEventListener('input', () => {
		// 	const content = textAreaElement.textContent;
		// 	textAreaElement.innerHTML = '';
		// 	textAreaElement.textContent = content;

		// });
	});

	// TODO: Submit on <Enter>
	export async function onSubmit() {
		if (stopSubmission) return;
		stopSubmission = true;

		if (wasUnauthorized) {
			messages.set([]);
			wasUnauthorized = false;
		}

		const textAreaElement = document.getElementById('user-input') as HTMLDivElement;
		const rawUserInput = textAreaElement.innerText.trim();
		textAreaElement.innerHTML = '';
		if (rawUserInput === '') return;
		console.log(rawUserInput);
		const config = get(configStore);

		const newMessage = {
			role: 'user',
			content: refineInput(config.pattern, rawUserInput)
		} satisfies Message;

		const systemMessage = `${config.system}

You are allowed to use markdown to format your answers.
You are allowed to use Latex to format mathematical expression\n
You will sorround Latex expressions with $ to make them inline and with $$ to put them on a new line.`;

		const payload = {
			model: config.advanced ? 'gpt-3.5-turbo-16k' : 'gpt-3.5-turbo',
			password: config.password,
			messages: [{ role: 'system', content: systemMessage }, ...get(messages), newMessage]
		} satisfies RequestData;

		messages.update((messages) => {
			messages.push(newMessage);
			return messages;
		});

		const response = await fetch('/chat', {
			method: 'POST',
			body: JSON.stringify(payload)
		});

		if (response.status === 401) {
			messages.update((messages) => {
				messages.push({ role: 'assistant', content: 'Unauthorized! Is the password correct?' });
				return messages;
			});
			latestAiResponse.set(null);
			stopSubmission = false;
			wasUnauthorized = true;
			return;
		}

		const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
		if (!reader) {
			stopSubmission = false;
			throw new Error('no response body');
		}

		latestAiResponse.set('');
		while (true) {
			const { value, done } = await reader.read();
			if (done || !value) break;

			const chunks = value.split('\n');
			chunks.forEach((chunk) => {
				if (chunk === '') return;

				const json = JSON.parse(chunk);
				console.log(json);
				const chunkContent: string = json.choices[0].delta.content || '';
				latestAiResponse.update((v) => v + chunkContent);

				console.log(latestAiResponse);
			});
		}

		messages.update((messages) => {
			messages.push({ role: 'assistant', content: get(latestAiResponse)! });
			return messages;
		});

		latestAiResponse.set(null);
		stopSubmission = false;
	}
</script>

<form action="" on:submit|preventDefault={onSubmit} class="mb-5 mr-5 flex flex-col">
	<div class="flex w-full items-center">
		<div
			class="w-full rounded-md border-2 bg-base-100 p-3"
			id="user-input"
			contenteditable="true"
			placeholder="Type your message..."
		>
			<!-- TODO: this kinda works.. 
					   It would be nice to have some kind of input validation,
					   so we don't allow rich text -->
		</div>
		<button class="-ml-10 h-6">
			<img src={sendImage} alt="send" draggable="false" id="send-icon" />
		</button>
	</div>
</form>

<style>
	[contenteditable='true']:empty:not(:focus):before {
		content: attr(placeholder);
		pointer-events: none;
		font-style: italic;
	}
</style>
