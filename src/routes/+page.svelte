<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	let copiedPip = $state(false);
	let copiedConda = $state(false);

	function copyToClipboard(text: string, type: 'pip' | 'conda') {
		navigator.clipboard.writeText(text);
		if (type === 'pip') {
			copiedPip = true;
			setTimeout(() => (copiedPip = false), 2000);
		} else {
			copiedConda = true;
			setTimeout(() => (copiedConda = false), 2000);
		}
	}
</script>

<svelte:head>
	<title>PathSim - Python Framework for Simulating Dynamical Systems</title>
	<meta name="description" content="PathSim is a Python framework for simulating dynamical systems using block diagrams. Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems." />
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1>PathSim</h1>
			<p class="tagline">A Python framework for simulating dynamical systems</p>
			<p class="description">
				Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems
				using intuitive block diagrams. From simple ODEs to complex multi-domain simulations.
			</p>
			<div class="hero-actions">
				<a href="https://docs.pathsim.org/pathsim/getting-started" class="btn primary">
					Get Started
				</a>
				<a href="https://view.pathsim.org" class="btn secondary">
					<Icon name="play" size={18} />
					Try Online
				</a>
			</div>
		</div>
		<div class="hero-visual">
			<pre class="code-example"><code><span class="kw">from</span> pathsim <span class="kw">import</span> Simulation, Connection
<span class="kw">from</span> pathsim.blocks <span class="kw">import</span> Integrator, Amplifier, Scope

<span class="cm"># Create blocks</span>
I = Integrator(initial_value=<span class="num">1.0</span>)
A = Amplifier(gain=<span class="num">-0.5</span>)
S = Scope()

<span class="cm"># Connect: feedback loop</span>
connections = [
    Connection(I, A, S),
    Connection(A, I)
]

<span class="cm"># Simulate</span>
sim = Simulation([I, A, S], connections)
sim.run(duration=<span class="num">10</span>)

<span class="cm"># Plot results</span>
S.plot()</code></pre>
		</div>
	</section>

	<!-- Features Section -->
	<section class="features">
		<h2>Why PathSim?</h2>
		<div class="feature-grid">
			<div class="feature-card">
				<div class="feature-icon">
					<Icon name="box" size={28} />
				</div>
				<h3>Block-Based Modeling</h3>
				<p>Build systems from reusable blocks: integrators, filters, controllers, and more. Connect them visually or programmatically.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<Icon name="cpu" size={28} />
				</div>
				<h3>Multiple Solvers</h3>
				<p>18 ODE solvers including explicit, implicit, and adaptive methods. Choose the right solver for your problem.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<Icon name="zap" size={28} />
				</div>
				<h3>Event Handling</h3>
				<p>Zero-crossing detection, scheduled events, and state-dependent triggers for discontinuous systems.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<Icon name="layers" size={28} />
				</div>
				<h3>Hierarchical Models</h3>
				<p>Organize complex systems with subsystems. Create reusable components and build libraries.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<Icon name="activity" size={28} />
				</div>
				<h3>Browser-Based Editor</h3>
				<p>Design systems visually with PathView. Run simulations directly in your browser with Pyodide.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<Icon name="external-link" size={28} />
				</div>
				<h3>Domain Toolboxes</h3>
				<p>Specialized blocks for chemical engineering (PathSim-Chem) and vehicle dynamics (PathSim-Vehicle).</p>
			</div>
		</div>
	</section>

	<!-- Installation Section -->
	<section class="installation">
		<h2>Installation</h2>
		<div class="install-options">
			<div class="install-option">
				<h3>pip</h3>
				<div class="install-command">
					<code>pip install pathsim</code>
					<button class="copy-btn" onclick={() => copyToClipboard('pip install pathsim', 'pip')}>
						<Icon name={copiedPip ? 'check' : 'copy'} size={16} />
					</button>
				</div>
			</div>
			<div class="install-option">
				<h3>conda</h3>
				<div class="install-command">
					<code>conda install -c conda-forge pathsim</code>
					<button class="copy-btn" onclick={() => copyToClipboard('conda install -c conda-forge pathsim', 'conda')}>
						<Icon name={copiedConda ? 'check' : 'copy'} size={16} />
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Ecosystem Section -->
	<section class="ecosystem">
		<h2>Ecosystem</h2>
		<div class="ecosystem-grid">
			<a href="https://docs.pathsim.org/pathsim" class="ecosystem-card">
				<h3>PathSim</h3>
				<p>Core simulation framework</p>
			</a>
			<a href="https://docs.pathsim.org/chem" class="ecosystem-card chem">
				<h3>PathSim-Chem</h3>
				<p>Chemical engineering toolbox</p>
			</a>
			<a href="https://docs.pathsim.org/vehicle" class="ecosystem-card vehicle">
				<h3>PathSim-Vehicle</h3>
				<p>Vehicle dynamics toolbox</p>
			</a>
			<a href="https://view.pathsim.org" class="ecosystem-card view">
				<h3>PathView</h3>
				<p>Browser-based visual editor</p>
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer>
		<div class="footer-content">
			<div class="footer-links">
				<a href="https://docs.pathsim.org">Documentation</a>
				<a href="https://github.com/milanofthe/pathsim">GitHub</a>
				<a href="https://pypi.org/project/pathsim">PyPI</a>
				<a href="https://github.com/milanofthe/pathsim/blob/main/LICENSE">MIT License</a>
			</div>
			<p class="copyright">PathSim</p>
		</div>
	</footer>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-lg);
	}

	section {
		padding: var(--space-4xl) 0;
	}

	h2 {
		font-size: var(--font-3xl);
		text-align: center;
		margin-bottom: var(--space-3xl);
	}

	/* Hero */
	.hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4xl);
		align-items: center;
		padding: var(--space-4xl) 0;
		min-height: 80vh;
	}

	@media (max-width: 900px) {
		.hero {
			grid-template-columns: 1fr;
			text-align: center;
		}
		.hero-visual {
			display: none;
		}
	}

	.hero h1 {
		font-size: var(--font-5xl);
		background: linear-gradient(135deg, var(--text) 0%, var(--accent) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-lg);
	}

	.tagline {
		font-size: var(--font-2xl);
		color: var(--text-muted);
		margin-bottom: var(--space-lg);
	}

	.description {
		font-size: var(--font-lg);
		color: var(--text-muted);
		margin-bottom: var(--space-2xl);
		max-width: 500px;
	}

	.hero-actions {
		display: flex;
		gap: var(--space-lg);
	}

	@media (max-width: 900px) {
		.hero-actions {
			justify-content: center;
		}
		.description {
			margin: 0 auto var(--space-2xl);
		}
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-xl);
		border-radius: var(--radius-md);
		font-weight: 500;
		font-size: var(--font-md);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.btn.primary {
		background: var(--accent);
		color: white;
	}

	.btn.primary:hover {
		background: var(--accent-hover);
		text-decoration: none;
	}

	.btn.secondary {
		background: var(--surface-raised);
		color: var(--text);
		border: 1px solid var(--border);
	}

	.btn.secondary:hover {
		border-color: var(--border-focus);
		text-decoration: none;
	}

	.code-example {
		background: var(--surface-raised);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		font-size: 13px;
		line-height: 1.6;
		overflow-x: auto;
	}

	.code-example .kw { color: #E57373; }
	.code-example .num { color: #4DB6AC; }
	.code-example .cm { color: var(--text-disabled); }

	/* Features */
	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-xl);
	}

	.feature-card {
		background: var(--surface-raised);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		transition: all var(--transition-normal);
	}

	.feature-card:hover {
		border-color: var(--border-focus);
		transform: translateY(-2px);
	}

	.feature-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--accent-bg);
		color: var(--accent);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-lg);
	}

	.feature-card h3 {
		font-size: var(--font-lg);
		margin-bottom: var(--space-sm);
	}

	.feature-card p {
		color: var(--text-muted);
		font-size: var(--font-base);
		margin: 0;
	}

	/* Installation */
	.install-options {
		display: flex;
		gap: var(--space-xl);
		justify-content: center;
		flex-wrap: wrap;
	}

	.install-option {
		background: var(--surface-raised);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		min-width: 300px;
	}

	.install-option h3 {
		font-size: var(--font-sm);
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--text-muted);
		margin-bottom: var(--space-md);
	}

	.install-command {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		background: var(--surface);
		padding: var(--space-md);
		border-radius: var(--radius-md);
	}

	.install-command code {
		flex: 1;
		background: none;
		border: none;
		padding: 0;
		font-size: var(--font-base);
	}

	.copy-btn {
		padding: var(--space-sm);
		background: transparent;
		color: var(--text-muted);
	}

	.copy-btn:hover {
		color: var(--text);
	}

	/* Ecosystem */
	.ecosystem-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--space-lg);
	}

	.ecosystem-card {
		background: var(--surface-raised);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		text-decoration: none;
		color: inherit;
		transition: all var(--transition-normal);
		border-top: 3px solid var(--accent);
	}

	.ecosystem-card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
		text-decoration: none;
	}

	.ecosystem-card.chem {
		border-top-color: #81C784;
	}

	.ecosystem-card.vehicle {
		border-top-color: #FFB74D;
	}

	.ecosystem-card.view {
		border-top-color: #64B5F6;
	}

	.ecosystem-card h3 {
		font-size: var(--font-lg);
		margin-bottom: var(--space-xs);
	}

	.ecosystem-card p {
		color: var(--text-muted);
		font-size: var(--font-sm);
		margin: 0;
	}

	/* Footer */
	footer {
		border-top: 1px solid var(--border);
		padding: var(--space-2xl) 0;
		margin-top: var(--space-4xl);
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-lg);
	}

	.footer-links {
		display: flex;
		gap: var(--space-xl);
		flex-wrap: wrap;
	}

	.footer-links a {
		color: var(--text-muted);
		font-size: var(--font-sm);
	}

	.footer-links a:hover {
		color: var(--text);
	}

	.copyright {
		color: var(--text-disabled);
		font-size: var(--font-sm);
		margin: 0;
	}
</style>
