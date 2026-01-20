<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Tooltip, { tooltip } from '$lib/components/Tooltip.svelte';
	import { external, nav } from '$lib/config/links';

	let { children } = $props();

	let theme = $state<'dark' | 'light'>('dark');

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'light' || saved === 'dark') {
			theme = saved;
		} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			theme = 'light';
		}
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<Tooltip />

<div class="app">
	<header>
		<div class="header-content">
			<a href="/" class="logo" use:tooltip={'Home'}>
				<img src="/favicon.png" alt="PathSim" />
			</a>
			<nav class="header-actions">
				<a href={nav.docs} class="icon-btn" use:tooltip={'Documentation'}>
					<Icon name="book" size={14} />
				</a>
				<a href={nav.tryOnline} class="icon-btn" use:tooltip={'Editor'}>
					<Icon name="play" size={14} />
				</a>
				<a href={nav.github} class="icon-btn" use:tooltip={'GitHub'}>
					<Icon name="github" size={14} />
				</a>
				<button class="icon-btn" onclick={toggleTheme} use:tooltip={'Toggle theme'}>
					<Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
				</button>
			</nav>
		</div>
	</header>
	{@render children()}
</div>

<style>
	.app {
		min-height: 100vh;
	}

	header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--surface-raised);
		border-bottom: 1px solid var(--border);
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-sm) var(--space-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
	}

	.logo img {
		height: 24px;
		width: auto;
	}

	nav {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}
</style>
