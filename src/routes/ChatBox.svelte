<script lang="ts">
	import { latestAiResponse, messages } from '$lib/stores';
	import { onMount } from 'svelte';
	import ChatLine from './ChatLine.svelte';
	import { browser } from '$app/environment';

	function scrollToBottom() {
		if (browser) {
			const container = document.getElementById('chatbox');
			if (container) container.scrollTop = container?.scrollHeight;
		}
	}

	onMount(scrollToBottom);
	messages.subscribe(scrollToBottom);
	latestAiResponse.subscribe(scrollToBottom);
</script>

<div id="chatbox" class="flex flex-col gap-4 overflow-auto p-6">
	{#each $messages as message}
		<ChatLine {message} />
	{/each}
	{#if $latestAiResponse !== null}
		<ChatLine message={{ role: 'assistant', content: $latestAiResponse }} />
	{/if}
</div>

<style>
</style>
