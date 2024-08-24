<script lang="ts">
	import type { Message } from '$lib/types';
	import AssistantIcon from '$lib/assets/terminal.svg';
	import UserIcon from '$lib/assets/smile.svg';
	import IconContainer from './IconContainer.svelte';

	export let message: Message;

	function copyContent() {
		navigator.clipboard.writeText(message.content);
	}

	import { marked } from 'marked';
	import katex from 'marked-katex-extension';
	import Markdown from 'svelte-markdown';
	import KatexRenderer from './Renderers/KatexRenderer.svelte';

	import Text from 'svelte-markdown/src/renderers/Text.svelte';

	marked.use(katex({ throwOnError: true }));
	const options = marked.defaults;
	const renderers = {
		blockKatex: KatexRenderer,
		inlineKatex: KatexRenderer,
		html: Text
	};
</script>

<div>
	<div class="text-right">
		<button on:click={copyContent} class="text-sm text-gray-500"> Copy </button>
	</div>
	<div class="flex items-center gap-4">
		<div id="icon-container" class="flex aspect-square items-center justify-center">
			{#if message.role === 'assistant'}
				<IconContainer src={AssistantIcon} alt={message.role} />
			{:else}
				<IconContainer src={UserIcon} alt={message.role} />
			{/if}
		</div>
		<div class="big-shadow w-full rounded-md bg-base-100 p-3">
			<Markdown
				source={message.content}
				{renderers}
				{options}
				on:parsed={(event) => {
					console.log(event.detail.tokens);
				}}
			/>
		</div>
	</div>
</div>

<style>
	#icon-container {
		width: 3em;
		height: 3em;
	}
</style>
