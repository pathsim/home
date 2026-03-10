#!/usr/bin/env node
/**
 * Generate llms.txt for the PathSim homepage.
 *
 * Reads the site config and produces a static llms.txt
 * that AI agents can fetch to understand the PathSim ecosystem.
 *
 * Usage:
 *   node scripts/build-llms-txt.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Read config.ts and extract data
// Since this is a build script, we parse the TS source directly
// to avoid needing a full TS compilation step.
const configPath = join(projectRoot, 'src', 'lib', 'config', 'config.ts');
const configSource = readFileSync(configPath, 'utf-8');

// Extract values from config using regex
function extractString(name) {
	const match = configSource.match(new RegExp(`${name}:\\s*['"\`]([^'"\`]+)['"\`]`));
	return match ? match[1] : '';
}

function extractArrayOfObjects(name) {
	const match = configSource.match(new RegExp(`export const ${name}[^=]*=\\s*\\[([\\s\\S]*?)\\];`, 'm'));
	if (!match) return [];
	const items = [];
	const re = /\{\s*title:\s*['"]([^'"]+)['"],\s*description:\s*['"]([^'"]+)['"]\s*\}/g;
	let m;
	while ((m = re.exec(match[1])) !== null) {
		items.push({ title: m[1], description: m[2] });
	}
	return items;
}

// Build llms.txt content
const lines = [];

lines.push('# PathSim');
lines.push('');
lines.push('> PathSim is a Python framework for simulating dynamical systems using block diagrams. Build, simulate, and analyze continuous-time, discrete-time, and hybrid systems.');
lines.push('');

lines.push('## Overview');
lines.push('');
lines.push('PathSim provides Python-native system modeling with intuitive block diagrams. From simple ODEs to complex multi-domain simulations.');
lines.push('');
lines.push('Install: `pip install pathsim` or `conda install -c conda-forge pathsim`');
lines.push('');

// Features
const features = extractArrayOfObjects('features');
if (features.length) {
	lines.push('## Features');
	lines.push('');
	for (const f of features) {
		lines.push(`- **${f.title}**: ${f.description}`);
	}
	lines.push('');
}

// Ecosystem
lines.push('## Ecosystem');
lines.push('');
lines.push('- [PathSim](https://github.com/pathsim/pathsim): Core simulation framework — [Docs](https://docs.pathsim.org/pathsim) — [PyPI](https://pypi.org/project/pathsim)');
lines.push('- [PathSim-Chem](https://github.com/pathsim/pathsim-chem): Chemical engineering blocks — [Docs](https://docs.pathsim.org/chem) — [PyPI](https://pypi.org/project/pathsim-chem)');
lines.push('- [PathSim-Vehicle](https://github.com/pathsim/pathsim-vehicle): Vehicle dynamics blocks — [Docs](https://docs.pathsim.org/vehicle)');
lines.push('- [PathSim-Flight](https://github.com/pathsim/pathsim-flight): Flight dynamics blocks — [Docs](https://docs.pathsim.org/flight)');
lines.push('- [PathSim-RF](https://github.com/pathsim/pathsim-rf): RF engineering blocks — [Docs](https://docs.pathsim.org/rf) — [PyPI](https://pypi.org/project/pathsim-rf)');
lines.push('- [PathView](https://view.pathsim.org): Browser-based visual block diagram editor');
lines.push('');

// Links
lines.push('## Links');
lines.push('');
lines.push('- [Homepage](https://pathsim.org)');
lines.push('- [Documentation](https://docs.pathsim.org)');
lines.push('- [PathView Editor](https://view.pathsim.org)');
lines.push('- [GitHub Organization](https://github.com/pathsim)');
lines.push('- [JOSS Paper](https://doi.org/10.21105/joss.07484)');
lines.push('- [Sponsor](https://github.com/sponsors/milanofthe)');
lines.push('');

const output = lines.join('\n');
const outputPath = join(projectRoot, 'static', 'llms.txt');
writeFileSync(outputPath, output, 'utf-8');
console.log(`Generated ${outputPath} (${output.length} bytes)`);
