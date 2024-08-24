<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import InputBox from './InputBox.svelte';
	import ChatBox from './ChatBox.svelte';
	import UserGreeter from './UserGreeter.svelte';
</script>

<svelte:head>
	<title>Secure-GPT</title>
	<meta name="description" content="Privacy friendly AI assistant" />
	<link rel="icon" href="/icon.png" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.css"
		integrity="sha384-OH8qNTHoMMVNVcKdKewlipV4SErXqccxxlg6HC9Cwjr5oZu2AdBej1TndeCirael"
		crossorigin="anonymous"
	/>
</svelte:head>

<UserGreeter />
<div class="z-10 flex h-full flex-row">
	<div id="fade" class="absolute z-0 w-full"></div>

	<Sidebar />
	<main class="flex w-full flex-col justify-end">
		<ChatBox />
		<InputBox />
	</main>
</div>

<style>
	#fade {
		height: 10em;
		background: linear-gradient(180deg, oklch(var(--b3)) 0%, #00000000 100%);
		user-select: none;
		pointer-events: none;
	}
</style>
