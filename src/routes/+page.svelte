<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { base } from '$app/paths';
	import Icon from '$lib/components/common/Icon.svelte';
	import { tooltip } from '$lib/components/common/Tooltip.svelte';
	import { loadCodeMirrorModules, createEditorExtensions, type CodeMirrorModules } from '$lib/utils/codemirror';
	import { packages, packageOrder, nav, hero, installation, features, exampleCode } from '$lib/config/config';
	import { copyToClipboard } from '$lib/utils/clipboard';

	let copiedPip = $state(false);
	let copiedConda = $state(false);
	let copiedCode = $state(false);

	let editorContainer = $state<HTMLDivElement | undefined>(undefined);
	let editorView: import('@codemirror/view').EditorView | null = null;
	let cmModules: CodeMirrorModules | null = null;
	let editorLoading = $state(true);
	let themeObserver: MutationObserver | null = null;

	function handleCopy(text: string, type: 'pip' | 'conda' | 'code') {
		const setters = {
			pip: { on: () => (copiedPip = true), off: () => (copiedPip = false) },
			conda: { on: () => (copiedConda = true), off: () => (copiedConda = false) },
			code: { on: () => (copiedCode = true), off: () => (copiedCode = false) }
		};
		copyToClipboard(text, setters[type].on, setters[type].off);
	}

	onMount(async () => {
		if (!editorContainer) return;

		cmModules = await loadCodeMirrorModules();

		const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

		editorView = new cmModules.EditorView({
			doc: exampleCode,
			extensions: createEditorExtensions(cmModules, isDark, { readOnly: true }),
			parent: editorContainer
		});

		editorLoading = false;

		// Watch for theme changes
		themeObserver = new MutationObserver(() => {
			if (editorView && cmModules && editorContainer) {
				const newIsDark = document.documentElement.getAttribute('data-theme') !== 'light';
				const currentCode = editorView.state.doc.toString();
				editorView.destroy();
				editorView = new cmModules.EditorView({
					doc: currentCode,
					extensions: createEditorExtensions(cmModules, newIsDark, { readOnly: true }),
					parent: editorContainer
				});
			}
		});
		themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
	});

	onDestroy(() => {
		themeObserver?.disconnect();
		editorView?.destroy();
	});
</script>

<svelte:head>
	<title>PathSim</title>
	<meta name="description" content={hero.metaDescription} />
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<img src="{base}/pathsim_logo.png" alt="PathSim" class="hero-logo" />
			<p class="tagline">{hero.tagline}</p>
			<p class="description">{hero.description}</p>
			<div class="hero-actions">
				<a href={nav.getStarted} class="action-card">
					<Icon name="zap" size={20} />
					<span class="action-label">Get Started</span>
				</a>
				<a href={nav.docs} class="action-card">
					<Icon name="book" size={20} />
					<span class="action-label">Docs</span>
				</a>
				<a href={nav.tryOnline} class="action-card">
					<Icon name="play" size={20} />
					<span class="action-label">Try Online</span>
				</a>
				<a href={nav.github} class="action-card">
					<Icon name="github" size={20} />
					<span class="action-label">GitHub</span>
				</a>
				<a href={nav.sponsor} class="action-card">
					<Icon name="heart" size={20} />
					<span class="action-label">Sponsor</span>
				</a>
			</div>
		</div>
		<div class="hero-visual">
			<div class="code-panel elevated">
				<div class="panel-header code-panel-header">
					<span>Example</span>
					<button
						class="icon-btn"
						onclick={() => handleCopy(exampleCode, 'code')}
						use:tooltip={copiedCode ? 'Copied!' : 'Copy'}
					>
						<Icon name={copiedCode ? 'check' : 'copy'} size={14} />
					</button>
				</div>
				<div class="panel-body code-panel-body" bind:this={editorContainer}>
					{#if editorLoading}
						<div class="loading">Loading...</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<div class="separator"></div>

	<!-- Installation Section -->
	<section class="installation">
		<h2>Installation</h2>
		<div class="install-grid">
			<button class="install-card elevated" onclick={() => handleCopy('pip install pathsim', 'pip')}>
				<div class="panel-header">
					<span>pip</span>
					<div class="header-actions">
						<span class="icon-btn" use:tooltip={copiedPip ? 'Copied!' : 'Copy'}>
							<Icon name={copiedPip ? 'check' : 'copy'} size={14} />
						</span>
					</div>
				</div>
				<div class="install-body">
					<code>pip install pathsim</code>
				</div>
			</button>
			<button class="install-card elevated" onclick={() => handleCopy('conda install -c conda-forge pathsim', 'conda')}>
				<div class="panel-header">
					<span>conda</span>
					<div class="header-actions">
						<span class="icon-btn" use:tooltip={copiedConda ? 'Copied!' : 'Copy'}>
							<Icon name={copiedConda ? 'check' : 'copy'} size={14} />
						</span>
					</div>
				</div>
				<div class="install-body">
					<code>conda install -c conda-forge pathsim</code>
				</div>
			</button>
		</div>
	</section>

	<div class="separator"></div>

	<!-- Ecosystem Section -->
	<section class="ecosystem">
		<h2>Ecosystem</h2>
		<div class="ecosystem-grid">
			{#each packageOrder as pkgId}
				{@const pkg = packages[pkgId]}
				<div class="ecosystem-card elevated">
					<div class="panel-header">
						<span>{pkg.shortName}</span>
						<div class="header-actions">
							{#if pkg.app}
								<a href={pkg.app} class="icon-btn" use:tooltip={'App'}>
									<Icon name="play" size={14} />
								</a>
							{/if}
							{#if pkg.api}
								<a href={pkg.api} class="icon-btn" use:tooltip={'API'}>
									<Icon name="braces" size={14} />
								</a>
							{/if}
							{#if pkg.docs}
								<a href={pkg.docs} class="icon-btn" use:tooltip={'Docs'}>
									<Icon name="book" size={14} />
								</a>
							{/if}
							{#if pkg.pypi}
								<a href={pkg.pypi} class="icon-btn" use:tooltip={'PyPI'}>
									<Icon name="package" size={14} />
								</a>
							{/if}
							{#if pkg.examples}
								<a href={pkg.examples} class="icon-btn" use:tooltip={'Examples'}>
									<Icon name="code" size={14} />
								</a>
							{/if}
							<a href={pkg.github} class="icon-btn" use:tooltip={'GitHub'}>
								<Icon name="github" size={14} />
							</a>
						</div>
					</div>
					<a href={pkg.app || pkg.docs} class="ecosystem-body">
						<img src="{base}/{pkg.logo}" alt={pkg.name} />
					</a>
				</div>
			{/each}
		</div>
	</section>

	<div class="separator"></div>

	<!-- Features Section -->
	<section class="features">
		<h2>Features</h2>
		<div class="feature-grid">
			{#each features as feature}
				<div class="feature-card elevated">
					<div class="panel-header">{feature.title}</div>
					<div class="panel-body feature-body">{feature.description}</div>
				</div>
			{/each}
		</div>
	</section>

</main>


<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-lg);
	}

	section {
		padding: var(--space-xl) 0;
	}

	h2 {
		font-size: var(--font-base);
		font-weight: 600;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: var(--space-lg);
	}

	/* Hero */
	.hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-3xl);
		align-items: center;
		padding: var(--space-2xl) 0;
	}

	@media (max-width: 900px) {
		.hero {
			grid-template-columns: 1fr;
		}
	}

	.hero-logo {
		height: 140px;
		width: auto;
		margin-bottom: var(--space-lg);
	}

	.tagline {
		font-size: var(--font-lg);
		font-weight: 600;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: var(--space-md);
	}

	.description {
		font-size: var(--font-base);
		color: var(--text-muted);
		margin-bottom: var(--space-xl);
		max-width: 450px;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}


	.code-panel {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		overflow: hidden;
		text-align: left;
	}

	.code-panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-xs) var(--space-md);
	}

	.code-panel-header .icon-btn {
		width: 24px;
		height: 24px;
	}

	.code-panel-body {
		min-height: 200px;
		padding: 0;
	}

	.code-panel-body .loading {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 200px;
		color: var(--text-muted);
		font-size: var(--font-base);
	}

	.code-panel-body :global(.cm-editor) {
		height: auto;
		max-height: 400px;
	}

	/* Features */
	.feature-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-lg);
	}

	@media (max-width: 1024px) {
		.feature-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.feature-grid {
			grid-template-columns: 1fr;
		}
	}

	.feature-card {
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.feature-card:hover {
		border-color: var(--accent);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 25%, transparent);
	}

	.feature-body {
		color: var(--text-muted);
	}

	/* Installation */
	.install-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-lg);
	}

	.install-card {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		overflow: hidden;
		background: transparent;
		padding: 0;
		text-align: left;
		cursor: pointer;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.install-card:hover {
		border-color: var(--accent);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 25%, transparent);
	}

	.install-card .panel-header,
	.install-card .install-body {
		width: 100%;
	}

	.install-body {
		display: flex;
		align-items: center;
		padding: var(--space-lg);
		background: var(--surface);
	}

	.install-body code {
		background: none;
		border: none;
		padding: 0;
		font-size: var(--font-sm);
	}

	/* Ecosystem */
	.ecosystem-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-lg);
	}

	@media (max-width: 900px) {
		.ecosystem-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.ecosystem-grid {
			grid-template-columns: 1fr;
		}
	}

	.ecosystem-card {
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		overflow: hidden;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.ecosystem-card:hover {
		border-color: var(--accent);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 25%, transparent);
	}

	.header-actions {
		display: flex;
		gap: var(--space-xs);
	}

	.ecosystem-body {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xl);
		background: var(--surface);
		text-decoration: none;
	}

	.ecosystem-body img {
		height: 100px;
		width: auto;
		object-fit: contain;
	}

	@media (max-width: 600px) {
		main {
			padding: 0 var(--space-md);
		}

		.hero {
			padding: var(--space-xl) 0;
		}

		.hero-logo {
			height: 100px;
		}
	}
</style>
