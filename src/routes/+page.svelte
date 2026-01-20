<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Tooltip, { tooltip } from '$lib/components/Tooltip.svelte';
	import { loadCodeMirrorModules, createEditorExtensions, type CodeMirrorModules } from '$lib/utils/codemirror';
	import { packages, nav, footer } from '$lib/config/links';

	let copiedPip = $state(false);
	let copiedConda = $state(false);
	let copiedCode = $state(false);

	let editorContainer = $state<HTMLDivElement | undefined>(undefined);
	let editorView: import('@codemirror/view').EditorView | null = null;
	let cmModules: CodeMirrorModules | null = null;
	let editorLoading = $state(true);

	const exampleCode = `from pathsim import Simulation, Connection
from pathsim.blocks import Integrator, Amplifier, Scope

# blocks
integ = Integrator(1.0)
amp = Amplifier(-0.5)
scope = Scope()

# connections (feedback loop)
connections = [
    Connection(integ, amp, scope),
    Connection(amp, integ)
]

# simulate
sim = Simulation([integ, amp, scope], connections)
sim.run(10.0)
scope.plot()`;

	function copyToClipboard(text: string, type: 'pip' | 'conda' | 'code') {
		navigator.clipboard.writeText(text);
		if (type === 'pip') {
			copiedPip = true;
			setTimeout(() => (copiedPip = false), 2000);
		} else if (type === 'conda') {
			copiedConda = true;
			setTimeout(() => (copiedConda = false), 2000);
		} else {
			copiedCode = true;
			setTimeout(() => (copiedCode = false), 2000);
		}
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
		const observer = new MutationObserver(() => {
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
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

		return () => {
			observer.disconnect();
			editorView?.destroy();
		};
	});
</script>

<svelte:head>
	<title>PathSim - Python Framework for Simulating Dynamical Systems</title>
	<meta name="description" content="PathSim is a Python framework for simulating dynamical systems using block diagrams. Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems." />
</svelte:head>

<Tooltip />

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<img src="/pathsim_logo.png" alt="PathSim" class="hero-logo" />
			<p class="tagline">Python native System modeling</p>
			<p class="description">
				Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems
				using intuitive block diagrams. From simple ODEs to complex multi-domain simulations.
			</p>
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
			<div class="code-panel">
				<div class="panel-header code-panel-header">
					<span>Example</span>
					<button
						class="icon-btn"
						onclick={() => copyToClipboard(exampleCode, 'code')}
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
			<button class="install-card" onclick={() => copyToClipboard('pip install pathsim', 'pip')}>
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
			<button class="install-card" onclick={() => copyToClipboard('conda install -c conda-forge pathsim', 'conda')}>
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
			<div class="ecosystem-card">
				<div class="panel-header">
					<span>{packages.pathview.shortName}</span>
					<div class="header-actions">
						<a href={packages.pathview.app} class="icon-btn" use:tooltip={'App'}>
							<Icon name="play" size={14} />
						</a>
						<a href={packages.pathview.github} class="icon-btn" use:tooltip={'GitHub'}>
							<Icon name="github" size={14} />
						</a>
					</div>
				</div>
				<a href={packages.pathview.app} class="ecosystem-body">
					<img src={packages.pathview.logo} alt={packages.pathview.name} />
				</a>
			</div>
			<div class="ecosystem-card">
				<div class="panel-header">
					<span>{packages.pathsim.shortName}</span>
					<div class="header-actions">
						<a href={packages.pathsim.api} class="icon-btn" use:tooltip={'API'}>
							<Icon name="braces" size={14} />
						</a>
						<a href={packages.pathsim.docs} class="icon-btn" use:tooltip={'Docs'}>
							<Icon name="book" size={14} />
						</a>
						<a href={packages.pathsim.pypi} class="icon-btn" use:tooltip={'PyPI'}>
							<Icon name="package" size={14} />
						</a>
						<a href={packages.pathsim.examples} class="icon-btn" use:tooltip={'Examples'}>
							<Icon name="play" size={14} />
						</a>
						<a href={packages.pathsim.github} class="icon-btn" use:tooltip={'GitHub'}>
							<Icon name="github" size={14} />
						</a>
					</div>
				</div>
				<a href={packages.pathsim.docs} class="ecosystem-body">
					<img src={packages.pathsim.logo} alt={packages.pathsim.name} />
				</a>
			</div>
			<div class="ecosystem-card">
				<div class="panel-header">
					<span>{packages.chem.shortName}</span>
					<div class="header-actions">
						<a href={packages.chem.api} class="icon-btn" use:tooltip={'API'}>
							<Icon name="braces" size={14} />
						</a>
						<a href={packages.chem.docs} class="icon-btn" use:tooltip={'Docs'}>
							<Icon name="book" size={14} />
						</a>
						<a href={packages.chem.pypi} class="icon-btn" use:tooltip={'PyPI'}>
							<Icon name="package" size={14} />
						</a>
						<a href={packages.chem.examples} class="icon-btn" use:tooltip={'Examples'}>
							<Icon name="play" size={14} />
						</a>
						<a href={packages.chem.github} class="icon-btn" use:tooltip={'GitHub'}>
							<Icon name="github" size={14} />
						</a>
					</div>
				</div>
				<a href={packages.chem.docs} class="ecosystem-body">
					<img src={packages.chem.logo} alt={packages.chem.name} />
				</a>
			</div>
			<div class="ecosystem-card">
				<div class="panel-header">
					<span>{packages.vehicle.shortName}</span>
					<div class="header-actions">
						<a href={packages.vehicle.api} class="icon-btn" use:tooltip={'API'}>
							<Icon name="braces" size={14} />
						</a>
						<a href={packages.vehicle.docs} class="icon-btn" use:tooltip={'Docs'}>
							<Icon name="book" size={14} />
						</a>
						<a href={packages.vehicle.pypi} class="icon-btn" use:tooltip={'PyPI'}>
							<Icon name="package" size={14} />
						</a>
						<a href={packages.vehicle.examples} class="icon-btn" use:tooltip={'Examples'}>
							<Icon name="play" size={14} />
						</a>
						<a href={packages.vehicle.github} class="icon-btn" use:tooltip={'GitHub'}>
							<Icon name="github" size={14} />
						</a>
					</div>
				</div>
				<a href={packages.vehicle.docs} class="ecosystem-body">
					<img src={packages.vehicle.logo} alt={packages.vehicle.name} />
				</a>
			</div>
		</div>
	</section>

	<div class="separator"></div>

	<!-- Features Section -->
	<section class="features">
		<h2>Features</h2>
		<div class="feature-grid">
			<div class="feature-card">
				<div class="panel-header">Hot-Swappable</div>
				<div class="panel-body feature-body">Switch blocks and solvers during active simulation at runtime.</div>
			</div>
			<div class="feature-card">
				<div class="panel-header">MIMO Capable</div>
				<div class="panel-body feature-body">Multiple input, multiple output ports built into all blocks.</div>
			</div>
			<div class="feature-card">
				<div class="panel-header">18+ Solvers</div>
				<div class="panel-body feature-body">Implicit, explicit, and adaptive integrators for stiff and non-stiff systems.</div>
			</div>
			<div class="feature-card">
				<div class="panel-header">Hierarchical</div>
				<div class="panel-body feature-body">Nested subsystems for modular, reusable component design.</div>
			</div>
			<div class="feature-card">
				<div class="panel-header">Event Handling</div>
				<div class="panel-body feature-body">Zero-crossing detection and scheduled events for hybrid systems.</div>
			</div>
			<div class="feature-card">
				<div class="panel-header">Extensible</div>
				<div class="panel-body feature-body">Create custom blocks by subclassing the base Block class.</div>
			</div>
			<div class="feature-card">
				<div class="panel-header">Browser Editor</div>
				<div class="panel-body feature-body">Design and simulate visually with PathView using Pyodide.</div>
			</div>
			<div class="feature-card">
				<div class="panel-header">Domain Toolboxes</div>
				<div class="panel-body feature-body">Specialized blocks for chemical engineering and vehicle dynamics.</div>
			</div>
		</div>
	</section>

</main>

<!-- Footer -->
<footer>
	<div class="footer-content">
		<a href={footer.docs} class="footer-link">
			<Icon name="book" size={14} />
			<span>Docs</span>
		</a>
		<a href={footer.github} class="footer-link">
			<Icon name="github" size={14} />
			<span>GitHub</span>
		</a>
		<a href={footer.pypi} class="footer-link">
			<Icon name="package" size={14} />
			<span>PyPI</span>
		</a>
		<span class="footer-text">MIT License</span>
	</div>
</footer>

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
		.hero-visual {
			display: none;
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
		color: var(--text);
		margin-bottom: var(--space-xl);
		max-width: 450px;
	}

	.hero-actions {
		display: flex;
		gap: var(--space-xs);
	}


	.code-panel {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		overflow: hidden;
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
		font-size: 12px;
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

	/* Footer */
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--surface-raised);
		border-top: 1px solid var(--border);
		z-index: 100;
	}

	/* Add padding to main to account for fixed footer */
	main {
		padding-bottom: 48px;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-sm) var(--space-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-lg);
	}

	.footer-link {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--text-muted);
		font-size: 11px;
		font-weight: 500;
		text-decoration: none;
	}

	.footer-link:hover {
		color: var(--text);
		text-decoration: none;
	}

	.footer-text {
		color: var(--text-muted);
		font-size: 11px;
		font-weight: 500;
	}
</style>
