<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import { tooltip } from '$lib/components/common/Tooltip.svelte';
	import { nav } from '$lib/config/config';

	interface Props {
		onThemeToggle: () => void;
		theme: 'dark' | 'light';
	}

	let { onThemeToggle, theme }: Props = $props();
</script>

<header>
	<div class="header-content">
		<nav class="header-actions">
			<a href={nav.docs} class="icon-btn" use:tooltip={'Docs'}>
				<Icon name="book" size={14} />
			</a>
			<a href="/" class="icon-btn" use:tooltip={'Home'}>
				<Icon name="home" size={14} />
			</a>
			<a href={nav.editor} class="icon-btn" use:tooltip={'Editor'}>
				<Icon name="play" size={14} />
			</a>
			<a href={nav.github} class="icon-btn" use:tooltip={'GitHub'}>
				<Icon name="github" size={14} />
			</a>
			<button class="icon-btn" onclick={onThemeToggle} use:tooltip={'Toggle theme'}>
				<Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
			</button>
		</nav>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
		height: var(--header-height);
		background: var(--surface-raised);
		border-bottom: 1px solid var(--border);
	}

	.header-content {
		height: 100%;
		padding: 0 var(--space-lg);
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	nav {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}
</style>
