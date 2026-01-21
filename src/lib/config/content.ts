// Centralized content configuration for PathSim Homepage
// All marketing/display text is defined here for easy updates

export const hero = {
	tagline: 'Python native System modeling',
	description:
		'Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems using intuitive block diagrams. From simple ODEs to complex multi-domain simulations.',
	metaDescription:
		'PathSim is a Python framework for simulating dynamical systems using block diagrams. Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems.'
};

export const installation = {
	commands: [
		{ name: 'pip', command: 'pip install pathsim' },
		{ name: 'conda', command: 'conda install -c conda-forge pathsim' }
	]
};

export const features = [
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
