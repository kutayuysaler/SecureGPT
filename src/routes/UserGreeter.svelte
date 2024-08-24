<script lang="ts">
	import UserIcon from '$lib/assets/smile.svg';
	import { latestAiResponse, messages } from '$lib/stores';
	import IconContainer from './IconContainer.svelte';

	function reset() {
		messages.set([]);
		latestAiResponse.set(null);

		// FIXME:
		// stopSubmission = false;
	}
</script>

<span class="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full bg-base-100 p-4">
	<IconContainer src={UserIcon} alt="user icon" />

	<span class="w-fit font-bold">
		Welcome,
		<pre class="inline">{'{username}'}</pre>
	</span>

	<button on:click={reset}>
		<IconContainer src="" alt="reset icon" />
	</button>
	<IconContainer src="" alt="logout icon" />
</span>
