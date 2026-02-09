<script lang="ts">
	import '../app.css';
	import { onMount, setContext } from 'svelte';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import Header from '$lib/components/layout/Header.svelte';

	let { children } = $props();

	let theme = $state<'dark' | 'light'>('dark');

	setContext('theme', () => theme);

	onMount(() => {
		const urlTheme = new URL(window.location.href).searchParams.get('theme');
		if (urlTheme === 'dark' || urlTheme === 'light') {
			theme = urlTheme;
			localStorage.setItem('theme', urlTheme);
		} else {
			const saved = localStorage.getItem('theme');
			if (saved === 'light' || saved === 'dark') {
				theme = saved;
			} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
				theme = 'light';
			}
		}
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<Tooltip />

<div class="app">
	<Header onThemeToggle={toggleTheme} {theme} />
	<main id="main-content">
		{@render children()}
	</main>
</div>

<style>
	.app {
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	main {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
