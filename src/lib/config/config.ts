/**
 * PathSim Homepage Configuration
 * Unified configuration for links, packages, and content
 */

// ============================================
// EXTERNAL URLS
// ============================================

export const external = {
	docs: 'https://docs.pathsim.org',
	view: 'https://view.pathsim.org',
	github: 'https://github.com/pathsim',
	pypi: 'https://pypi.org/project',
	sponsor: 'https://github.com/sponsors/milanofthe'
};

// ============================================
// PACKAGES
// ============================================

export interface PackageConfig {
	name: string;
	shortName: string;
	logo: string;
	docs: string;
	api?: string;
	examples?: string;
	pypi?: string;
	github: string;
	app?: string;
}

export const packages: Record<string, PackageConfig> = {
	pathsim: {
		name: 'PathSim',
		shortName: 'pathsim',
		logo: '/pathsim_logo.png',
		docs: `${external.docs}/pathsim`,
		api: `${external.docs}/pathsim/api`,
		examples: `${external.docs}/pathsim/examples`,
		pypi: `${external.pypi}/pathsim`,
		github: `${external.github}/pathsim`
	},
	chem: {
		name: 'PathSim-Chem',
		shortName: 'chem',
		logo: '/pathsim_chem_logo.png',
		docs: `${external.docs}/chem`,
		api: `${external.docs}/chem/api`,
		examples: `${external.docs}/chem/examples`,
		pypi: `${external.pypi}/pathsim-chem`,
		github: `${external.github}/pathsim-chem`
	},
	vehicle: {
		name: 'PathSim-Vehicle',
		shortName: 'vehicle',
		logo: '/pathsim_vehicle_logo.png',
		docs: `${external.docs}/vehicle`,
		api: `${external.docs}/vehicle/api`,
		examples: `${external.docs}/vehicle/examples`,
		pypi: `${external.pypi}/pathsim-vehicle`,
		github: `${external.github}/pathsim-vehicle`
	},
	pathview: {
		name: 'PathView',
		shortName: 'pathview',
		logo: '/pathview_logo.png',
		docs: external.view,
		app: external.view,
		github: `${external.github}/pathview`
	}
};

// Package display order for ecosystem section
export const packageOrder = ['pathview', 'pathsim', 'chem', 'vehicle'] as const;

// ============================================
// NAVIGATION
// ============================================

export const nav = {
	getStarted: `${external.docs}/pathsim/getting-started`,
	docs: external.docs,
	tryOnline: external.view,
	github: `${external.github}/pathsim`,
	sponsor: external.sponsor
};

export const footer = {
	docs: external.docs,
	github: `${external.github}/pathsim`,
	pypi: `${external.pypi}/pathsim`
};

// ============================================
// HERO CONTENT
// ============================================

export const hero = {
	tagline: 'Python native System modeling',
	description:
		'Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems using intuitive block diagrams. From simple ODEs to complex multi-domain simulations.',
	metaDescription:
		'PathSim is a Python framework for simulating dynamical systems using block diagrams. Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems.'
};

// ============================================
// INSTALLATION
// ============================================

export interface InstallCommand {
	name: string;
	command: string;
}

export const installation: InstallCommand[] = [
	{ name: 'pip', command: 'pip install pathsim' },
	{ name: 'conda', command: 'conda install -c conda-forge pathsim' }
];

// ============================================
// FEATURES
// ============================================

export interface Feature {
	title: string;
	description: string;
}

export const features: Feature[] = [
	{
		title: 'Hot-Swappable',
		description: 'Switch blocks and solvers during active simulation at runtime.'
	},
	{
		title: 'MIMO Capable',
		description: 'Multiple input, multiple output ports built into all blocks.'
	},
	{
		title: '18+ Solvers',
		description: 'Implicit, explicit, and adaptive integrators for stiff and non-stiff systems.'
	},
	{
		title: 'Hierarchical',
		description: 'Nested subsystems for modular, reusable component design.'
	},
	{
		title: 'Event Handling',
		description: 'Zero-crossing detection and scheduled events for hybrid systems.'
	},
	{
		title: 'Extensible',
		description: 'Create custom blocks by subclassing the base Block class.'
	},
	{
		title: 'Browser Editor',
		description: 'Design and simulate visually with PathView using Pyodide.'
	},
	{
		title: 'Domain Toolboxes',
		description: 'Specialized blocks for chemical engineering and vehicle dynamics.'
	}
];

// ============================================
// EXAMPLE CODE
// ============================================

export const exampleCode = `from pathsim import Simulation, Connection
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
