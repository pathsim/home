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

	let expanded = $state(false);
	let imgElement: HTMLImageElement | undefined = $state();

	const src = $derived(theme === 'light' ? screenshot.light : screenshot.dark);
	const mobileSrc = $derived(
		theme === 'light' ? screenshot.lightMobile : screenshot.darkMobile
	);

	function handleClick() {
		const doc = document as Document & {
			startViewTransition?: (cb: () => Promise<void>) => { finished: Promise<void> };
		};

		if (!doc.startViewTransition) {
			onnavigate();
			return;
		}

		const transition = doc.startViewTransition(() => {
			expanded = true;
			return Promise.resolve();
		});

		transition.finished.then(() => {
			onnavigate();
		});
	}
</script>

<button class="portal-screenshot" onclick={handleClick} aria-label="Open {id}">
	<picture>
		{#if mobileSrc}
			<source media="(max-width: 600px)" srcset="{base}/{mobileSrc}" />
		{/if}
		<img
			bind:this={imgElement}
			src="{base}/{src}"
			alt="{id} preview"
			class="portal-screenshot-img"
			class:expanded
			style="view-transition-name: portal-{id};"
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

	.portal-screenshot-img.expanded {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		aspect-ratio: auto;
		object-fit: cover;
	}
</style>
