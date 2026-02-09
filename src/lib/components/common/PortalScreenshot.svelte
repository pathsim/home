<script lang="ts">
	import { base } from '$app/paths';
	import type { ScreenshotConfig } from '$lib/config/config';

	interface Props {
		id: string;
		screenshot: ScreenshotConfig;
		theme: 'dark' | 'light';
		onnavigate: () => void;
	}

	let { id, screenshot, theme, onnavigate }: Props = $props();

	const src = $derived(theme === 'light' ? screenshot.light : screenshot.dark);
	const mobileSrc = $derived(
		theme === 'light' ? screenshot.lightMobile : screenshot.darkMobile
	);
</script>

<button class="portal-screenshot" onclick={onnavigate} aria-label="Open {id}">
	<picture>
		{#if mobileSrc}
			<source media="(max-width: 600px)" srcset="{base}/{mobileSrc}" />
		{/if}
		<img
			src="{base}/{src}"
			alt="{id} preview"
			class="portal-screenshot-img"
		/>
	</picture>
</button>

<style>
	.portal-screenshot {
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		border-radius: 0;
		background: var(--surface);
		cursor: pointer;
		overflow: hidden;
	}

	.portal-screenshot-img {
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
		object-position: top;
		aspect-ratio: 16 / 10;
	}

</style>
