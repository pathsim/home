<p align="center">
  <img src="https://raw.githubusercontent.com/pathsim/pathsim-home/master/static/pathsim_logo.png" width="300" alt="PathSim Logo" />
</p>

------------

# PathSim Home - Landing Page

The official landing page for the PathSim ecosystem, showcasing PathSim, PathSim-Chem, PathSim-Vehicle, and PathView. Built with SvelteKit and hosted at [pathsim.org](https://pathsim.org).

## Tech Stack

- [SvelteKit 2](https://kit.svelte.dev/) with Svelte 5 runes
- [CodeMirror 6](https://codemirror.net/) for interactive code examples
- Static site generation via adapter-static
- CSS custom properties for theming

## Getting Started

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Icon.svelte        # 440+ SVG icons
│   │   │   ├── Tooltip.svelte     # Position-aware tooltips
│   │   │   └── CodeBlock.svelte   # Code display component
│   │   └── layout/
│   │       ├── Header.svelte      # Sticky navigation
│   │       └── Footer.svelte      # Footer links
│   ├── config/
│   │   ├── config.ts              # Links, content, features
│   │   ├── cdn.ts                 # External resource URLs
│   │   └── timing.ts              # Animation timings
│   └── utils/
│       ├── codemirror.ts          # Editor setup
│       ├── clipboard.ts           # Copy functionality
│       └── colors.ts              # Syntax highlighting
├── routes/
│   ├── +layout.svelte             # App shell, theme toggle
│   └── +page.svelte               # Homepage
└── app.css                        # Global design system

static/
├── favicon.png
├── pathsim_logo.png
├── pathsim_chem_logo.png
├── pathsim_vehicle_logo.png
├── pathsim_flight_logo.png
└── pathview_logo.png
```

---

## Page Sections

### Hero Section

- PathSim logo and tagline
- Brief description
- Action buttons: Get Started, Docs, Editor, GitHub, Sponsor
- Interactive code example (read-only CodeMirror)

### Installation

Two-card layout with one-click copy:

```bash
pip install pathsim
conda install -c conda-forge pathsim
```

### Ecosystem

Grid of 4 package cards:

| Package | Description |
|---------|-------------|
| **PathView** | Visual node editor (Editor) |
| **PathSim** | Core simulation framework |
| **PathSim-Chem** | Chemical reaction networks |
| **PathSim-Vehicle** | Vehicle dynamics |

Each card links to: App/Editor, API docs, Documentation, PyPI, Examples, GitHub

### Features

8 feature cards in a 4-column grid:

- Block-Diagram Modeling
- Adaptive Time-Stepping
- Real-Time Simulation
- Hierarchical Systems
- FMU Support
- Chemical Kinetics
- Vehicle Dynamics
- Open Source

---

## Configuration

### Content Configuration (`src/lib/config/config.ts`)

All external links and content in one place:

```typescript
export const links = {
  docs: 'https://docs.pathsim.org',
  view: 'https://view.pathsim.org',
  github: 'https://github.com/pathsim/pathsim',
  pypi: 'https://pypi.org/project/pathsim',
  sponsor: 'https://github.com/sponsors/pathsim'
};

export const hero = {
  tagline: 'Simulation Made Simple',
  description: 'A Python framework for...'
};

export const features = [
  { title: 'Block-Diagram Modeling', description: '...' },
  // ...
];

export const exampleCode = `
from pathsim import Simulation
from pathsim.blocks import Integrator, Amplifier
# ...
`;
```

### Packages Configuration

```typescript
export const packages = {
  pathsim: {
    name: 'PathSim',
    logo: '/pathsim_logo.png',
    links: { ... }
  },
  chem: { ... },
  vehicle: { ... },
  pathview: { ... }
};
```

---

## Design System

Global styles in `app.css` (1000+ lines) with CSS custom properties.

### Theme Support

- **Dark theme** (default): `--surface: #08080c`
- **Light theme**: `--surface: #f0f0f4`
- Toggle via `data-theme` attribute on `<html>`
- Persisted to localStorage

### Color Palette

| Variable | Dark | Light | Usage |
|----------|------|-------|-------|
| `--surface` | #08080c | #f0f0f4 | Page background |
| `--surface-raised` | #1c1c26 | #ffffff | Cards, panels |
| `--text` | #f0f0f5 | #1a1a1f | Primary text |
| `--text-muted` | #808090 | #606068 | Secondary text |
| `--accent` | #0070c0 | #0070c0 | Brand blue |
| `--border` | #2a2a36 | #d4d4dc | Borders |

### Typography

- **UI Font**: Inter (Google Fonts)
- **Code Font**: JetBrains Mono
- **Base size**: 12px
- **Scale**: xs (10px), sm (11px), base (12px), md (14px), lg (16px)

### Spacing Scale

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

### Component Classes

| Class | Usage |
|-------|-------|
| `.panel` | Container with border and background |
| `.tile` | Clickable panel variant |
| `.elevated` | Subtle shadow effect |
| `.install-card` | Installation command card |
| `.icon-btn` | Icon-only button |

### Responsive Breakpoints

```css
@media (max-width: 900px)  /* Desktop → Tablet */
@media (max-width: 768px)  /* Tablet → Mobile */
@media (max-width: 600px)  /* Small mobile */
```

---

## Components

### Icon.svelte

440+ SVG icons from Feather icon set:

```svelte
<Icon name="github" size={16} />
<Icon name="zap" />  <!-- Default 14px -->
```

Common icons: `zap`, `book`, `play`, `github`, `heart`, `sun`, `moon`, `code`, `copy`, `check`, `external-link`

### Tooltip.svelte

Position-aware tooltips via Svelte action:

```svelte
<script>
  import { tooltip } from '$lib/components/common/Tooltip.svelte';
</script>

<button use:tooltip={'Click to copy'}>Copy</button>
<button use:tooltip={{ text: 'Shortcut', shortcut: '⌘C' }}>Copy</button>
```

Features:
- Auto-positioning (top, bottom, left, right)
- Viewport collision detection
- Optional keyboard shortcut display
- 50ms show/hide delay

### CodeBlock.svelte

Read-only code display with syntax highlighting:

```svelte
<CodeBlock code={pythonCode} language="python" />
```

Features:
- CodeMirror 6 with Python syntax
- Dark/light theme support
- Copy button with feedback
- Loading state

---

## Utilities

### codemirror.ts

CodeMirror setup with custom theming:

```typescript
import { loadCodeMirrorModules, createEditorExtensions, EditorManager } from '$lib/utils/codemirror';

// Load modules (cached)
const modules = await loadCodeMirrorModules();

// Create extensions
const extensions = createEditorExtensions(modules, {
  readOnly: true,
  theme: 'dark'
});

// Or use EditorManager for full lifecycle
const manager = new EditorManager(container, {
  initialDoc: code,
  readOnly: true
});
await manager.init();
manager.updateTheme('light');
manager.destroy();
```

### clipboard.ts

Copy to clipboard with feedback:

```typescript
import { copyToClipboard } from '$lib/utils/clipboard';

await copyToClipboard(text, {
  onStart: () => setCopying(true),
  onSuccess: () => setSuccess(true),
  onError: (err) => console.error(err),
  onFinish: () => setCopying(false)
});
```

---

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server (localhost:5173) |
| `npm run build` | Production build to `build/` |
| `npm run preview` | Preview production build |
| `npm run check` | TypeScript/Svelte type checking |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

---

## Deployment

GitHub Pages deployment via GitHub Actions.

### Workflow (`.github/workflows/deploy.yml`)

1. Trigger on push to `master`
2. Setup Node.js 20
3. Build with `BASE_PATH=/${{ github.event.repository.name }}`
4. Deploy to GitHub Pages

### Environment Variables

- `BASE_PATH`: URL base path for subpath deployment

---

## Integration Points

### External Links

| Service | URL |
|---------|-----|
| Documentation | docs.pathsim.org |
| Visual Editor | view.pathsim.org |
| GitHub Org | github.com/pathsim |
| PyPI | pypi.org/project/pathsim |
| Sponsorship | github.com/sponsors/pathsim |

### Cross-Project Design System

The design system (`app.css`) is shared across:
- pathsim-home (this repo)
- pathsim-docs
- pathview

Key shared elements:
- CSS custom properties
- Color palette
- Typography scale
- Component classes (`.panel`, `.tile`, `.elevated`)

---

## Design Principles

1. **Configuration-driven** - All content in `config.ts`, easy to update
2. **Global styles first** - Design tokens in `app.css`, reused everywhere
3. **Minimal components** - Only essential UI (Icon, Tooltip, Header, Footer)
4. **Dark-first design** - Default dark theme, light as override
5. **Responsive by default** - Mobile-friendly from the start
6. **Static generation** - No server required, fast CDN delivery
