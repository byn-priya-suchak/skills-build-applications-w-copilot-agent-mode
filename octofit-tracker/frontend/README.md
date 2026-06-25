# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## API Base URL Configuration

Define `VITE_CODESPACE_NAME` for Codespaces API calls, for example in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app uses this value to call:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

`http://localhost:8000/api/[component]/`

The data components support both plain array responses and paginated shapes such as `{ results: [...] }` or `{ data: [...] }`.
