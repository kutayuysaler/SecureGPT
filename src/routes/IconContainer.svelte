<script lang="ts">
	export let src: string;
	export let alt: string;
</script>

<div class="flex items-center justify-center rounded-full p-2">
	<img {src} {alt} />
</div>

<style>
	div {
		background: linear-gradient(180deg, rgb(70, 34, 178) 0%, rgba(224, 155, 237, 0.25) 100%);
	}
</style>
