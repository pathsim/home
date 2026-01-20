// Centralized link configuration for PathSim Home

export const external = {
	docs: 'https://docs.pathsim.org',
	view: 'https://view.pathsim.org',
	github: 'https://github.com/pathsim',
	pypi: 'https://pypi.org/project',
	sponsor: 'https://github.com/sponsors/milanofthe'
};

export const packages = {
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
		app: external.view,
		github: `${external.github}/pathview`
	}
};

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
