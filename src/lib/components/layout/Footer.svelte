<script lang="ts">
	import Icon from '$lib/components/common/Icon.svelte';
	import { footer } from '$lib/config/config';
</script>

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
	footer {
		background: var(--surface-raised);
		border-top: 1px solid var(--border);
		flex-shrink: 0;
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
		font-size: var(--font-base);
		font-weight: 500;
		text-decoration: none;
	}

	.footer-link:hover {
		color: var(--text);
		text-decoration: none;
	}

	.footer-text {
		color: var(--text-muted);
		font-size: var(--font-base);
		font-weight: 500;
	}
</style>
