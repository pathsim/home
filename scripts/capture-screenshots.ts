#!/usr/bin/env tsx

/**
 * Captures screenshots of ecosystem sites for portal tiles.
 * Iterates over packages defined in src/lib/config/config.ts so the list
 * stays in sync with the homepage. Captures both dark and light themes via
 * the ?theme= URL parameter. Run with: npm run screenshots
 */

import puppeteer, { type Browser } from 'puppeteer-core';
import { existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { packages, packageOrder, type PackageConfig } from '../src/lib/config/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, '..', 'static', 'screenshots');

interface Viewport {
	suffix: string;
	width: number;
	height: number;
	label: string;
}

const defaultViewports: Viewport[] = [
	{ suffix: '', width: 800, height: 500, label: 'desktop' },
	{ suffix: '-mobile', width: 280, height: 600, label: 'mobile' }
];

const pathviewViewports: Viewport[] = [
	{ suffix: '', width: 1440, height: 900, label: 'desktop' },
	{ suffix: '-mobile', width: 390, height: 844, label: 'mobile' }
];

const themes = ['dark', 'light'] as const;

function viewportsFor(shortName: string): Viewport[] {
	return shortName === 'pathview' ? pathviewViewports : defaultViewports;
}

function urlFor(pkg: PackageConfig): string | null {
	return pkg.app ?? pkg.docs ?? null;
}

async function captureScreenshot(
	browser: Browser,
	id: string,
	url: string,
	theme: string,
	viewport: Viewport
): Promise<void> {
	const themedUrl = `${url}${url.includes('?') ? '&' : '?'}theme=${theme}`;
	console.log(`  ${id} ${theme} ${viewport.label}...`);

	const page = await browser.newPage();
	await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 2 });

	try {
		await page.goto(themedUrl, { waitUntil: 'networkidle2', timeout: 30000 });
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const filename = `${id}-${theme}${viewport.suffix}.png`;
		const outputPath = join(SCREENSHOTS_DIR, filename);
		await page.screenshot({ path: outputPath as `${string}.png`, type: 'png' });
		console.log(`    Saved: ${filename}`);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`    Error: ${message}`);
	} finally {
		await page.close();
	}
}

async function main(): Promise<void> {
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
		for (const pkgId of packageOrder) {
			const pkg = packages[pkgId];
			const url = urlFor(pkg);
			if (!url) {
				console.log(`\n⊘ ${pkg.shortName}: no app/docs URL, skipping`);
				continue;
			}
			console.log(`\nCapturing ${pkg.shortName} (${url}):`);
			const viewports = viewportsFor(pkg.shortName);
			for (const theme of themes) {
				for (const viewport of viewports) {
					await captureScreenshot(browser, pkg.shortName, url, theme, viewport);
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
