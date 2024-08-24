<script lang="ts">
	import { config } from '$lib/stores';
	import Logo from '$lib/assets/logo-colorful.png';
</script>

<nav class="z-10 m-5 mt-16 min-w-min">
	<div class="inline w-screen">
		<h1 class="mb-5 ml-5 text-5xl font-bold">
			<span> Secure GPT </span>
			<img src={Logo} alt="logo" class="inline h-12" draggable="false" />
		</h1>
	</div>

	<form class="big-shadow flex flex-col rounded-3xl bg-base-100 p-5">
		<span class="mb-4">
			<label for="password"> Password </label>
			<input
				id="password"
				type="password"
				placeholder="Enter key..."
				bind:value={$config.password}
			/>
		</span>

		<span class="mb-4">
			<label for="system"> System message </label>
			<input id="system" type="text" bind:value={$config.system} />
		</span>

		<span class="mb-4">
			<label for="pattern"> Choose a pattern: </label>
			<br />
			<select id="pattern" bind:value={$config.pattern}>
				<option value="Neutral">Neutral</option>
				<option value="Prompt Refinement">Prompt Refinement</option>
				<option value="Fact Check List">Fact Check List</option>
				<option value="Reflection Pattern">Reflection Pattern</option>
			</select>
		</span>

		<span class="mb-4 flex items-center justify-around">
			<input type="checkbox" class="toggle" bind:checked={$config.advanced} />
			<label for="model" class="font-bold"> Advanced Model </label>
			<span class="mx-2">?</span>
		</span>
	</form>
</nav>

<style lang="postcss">
	label {
		@apply font-medium;
	}

	input[type='text'],
	input[type='password'],
	select {
		@apply w-full rounded-md border bg-inherit px-4 py-2;
	}

	#password {
		background: url('$lib/assets/key.svg') no-repeat scroll 7px 7px;
		@apply pl-10 placeholder:italic;
	}

	h1 span {
		background: linear-gradient(180deg, rgb(63, 29, 176) 0%, rgb(224, 155, 237) 100%);
		background-clip: text;
		color: transparent;
	}

	.toggle {
		background: linear-gradient(180deg, rgb(63, 29, 176) 0%, rgb(224, 155, 237) 100%);
	}
</style>
