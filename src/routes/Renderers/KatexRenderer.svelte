<script lang="ts">
	// https://github.com/pablo-abc/svelte-markdown/issues/17#issuecomment-1500911693

	import Katex from 'svelte-katex';

	export let text: string;
</script>

<Katex>{text}</Katex>
