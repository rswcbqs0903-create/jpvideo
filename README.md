# jpvideo

Expo Router project for building the `jpvideo` app across iOS/Android/Web.

## Development

Install dependencies with `pnpm`:

```bash
pnpm install
```

Start development server:

```bash
pnpm expo start
```

## Key structure

- `app/`: Expo Router pages and layouts
- `components/`: reusable UI components
- `hooks/`: shared React hooks
- `constants/`: shared constants
- `assets/`: static assets
- `ios/`, `android/`: native projects
- `.claude/`: Claude project settings source
- `.codex/`: Codex migration output (for this project currently includes migration report)
- `.agents/skills/`: local skills used by Codex/agents

## Notes

- `AGENTS.md` is currently linked to `CLAUDE.md` via migration tooling.
- Before implementing Expo code, use the versioned docs: <https://docs.expo.dev/versions/v54.0.0/>.
