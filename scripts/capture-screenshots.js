#!/usr/bin/env node

/**
 * Captures screenshots of ecosystem sites for portal tiles.
 * Captures both dark and light themes using ?theme= URL parameter.
 * Run with: npm run screenshots
 */

import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, '..', 'static', 'screenshots');

const sites = [
	{ id: 'pathview', url: 'https://view.pathsim.org' },
	{ id: 'pathsim', url: 'https://docs.pathsim.org/pathsim' },
	{ id: 'chem', url: 'https://docs.pathsim.org/chem' },
	{ id: 'vehicle', url: 'https://docs.pathsim.org/vehicle' }
];

const themes = ['dark', 'light'];

const viewports = [
	{ suffix: '', width: 800, height: 500, label: 'desktop' },
	{ suffix: '-mobile', width: 280, height: 600, label: 'mobile' }
];

async function captureScreenshot(browser, site, theme, viewport) {
	const url = `${site.url}${site.url.includes('?') ? '&' : '?'}theme=${theme}`;
	console.log(`  ${site.id} ${theme} ${viewport.label}...`);

	const page = await browser.newPage();
	await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 2 });

	try {
		await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const filename = `${site.id}-${theme}${viewport.suffix}.png`;
		const outputPath = join(SCREENSHOTS_DIR, filename);
		await page.screenshot({ path: outputPath, type: 'png' });
		console.log(`    Saved: ${filename}`);
	} catch (error) {
		console.error(`    Error: ${error.message}`);
	} finally {
		await page.close();
	}
}

async function main() {
	if (!existsSync(SCREENSHOTS_DIR)) {
		mkdirSync(SCREENSHOTS_DIR, { recursive: true });
	}

	console.log('Launching browser...');
	const browser = await puppeteer.launch({
		headless: true,
		channel: 'chrome',
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	try {
		for (const site of sites) {
			console.log(`\nCapturing ${site.id} (${site.url}):`);
			for (const theme of themes) {
				for (const viewport of viewports) {
					await captureScreenshot(browser, site, theme, viewport);
				}
			}
		}
	} finally {
		await browser.close();
	}

	console.log('\nDone!');
}

main().catch((error) => {
	console.error('Fatal error:', error);
	process.exit(1);
});
