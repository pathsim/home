<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';

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

<div class="app">
	<header>
		<div class="header-content">
			<a href="/" class="logo">
				<img src="/pathsim_logo.png" alt="PathSim" height="32" />
			</a>
			<nav>
				<a href="https://docs.pathsim.org">Docs</a>
				<a href="https://view.pathsim.org">Editor</a>
				<a href="https://github.com/milanofthe/pathsim">
					<Icon name="github" size={20} />
				</a>
				<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
					<Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
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
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-md) var(--space-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
	}

	.logo img {
		height: 40px;
		width: auto;
	}

	nav {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
	}

	nav a {
		color: var(--text-muted);
		font-size: var(--font-sm);
		font-weight: 500;
		transition: color var(--transition-fast);
	}

	nav a:hover {
		color: var(--text);
	}

	.theme-toggle {
		padding: var(--space-sm);
		background: transparent;
		color: var(--text-muted);
		border-radius: var(--radius-sm);
	}

	.theme-toggle:hover {
		color: var(--text);
		background: var(--surface-raised);
	}
</style>
