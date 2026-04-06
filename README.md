# Sudoku Game

This repository contains a standalone Angular 21 Sudoku app that integrates with the Sugoku API.

## What the app does

- Lets the user pick a difficulty (`easy`, `medium`, `hard`, `random`) and fetch a board.
- Renders a 9x9-like grid through reusable row and cell components.
- Supports game actions from the UI:
  - `Get Board`
  - `Validate Board`
  - `Grade Board`
  - `Solve Board`
  - `Clear Board`
- Tracks and displays game metadata (`gameStatus`, selected difficulty, and `boardStatus`).

## Architecture at a glance

- Bootstrap: `src/main.ts` -> `bootstrapApplication(App, appConfig)`.
- Root component: `src/app/app.ts` + template `src/app/app.html`.
- State management: `src/app/app-store.ts` using `@ngrx/signals` (`signalStore`, `patchState`).
- API integration: `src/app/board-service.ts`.
- Endpoint map and base URL: `src/app/enums/endpoints.ts` (`sudokuTier = https://sugoku.onrender.com`).
- Rendering hierarchy:
  - `App`
  - `BoardRow` (`src/app/board-row/board-row.ts`)
  - `BoardCell` (`src/app/board-cell/board-cell.ts`)

## Deployed on Netlify: https://k-tech-assignment-6aeya4v0h-vladyns-projects.vercel.app/

## API behavior

First, fire up the back-end server: https://sugoku.onrender.com/
Hosted on free tier, so it may take a moment to wake up if idle.
The app calls SuGOku endpoints:

- `GET /board?difficulty=...` to fetch a puzzle
- `POST /validate`
- `POST /grade`
- `POST /solve`

POST requests are sent as `application/x-www-form-urlencoded` with board payload encoding handled in `BoardService.encodeBoard`.

## Local development

Install dependencies:

```bash
npm install
```

Run the dev server (Angular CLI default `http://localhost:4200`):

```bash
npm start
```

Build production output:

```bash
npm run build
```

Build in watch mode with development configuration:

```bash
npm run watch
```

Run unit tests (Angular unit-test builder + Vitest globals):

```bash
npm test
```

## Notes and current limitations

- Router is configured but has no routes yet (`src/app/app.routes.ts`).
- `BoardService` uses `HttpClient`; ensure `provideHttpClient()` is added in `src/app/app.config.ts` for runtime API calls.
- `Clear Board` restores the original fetched puzzle state, not an empty grid.

## Useful files

- `src/app/app.ts` - UI actions and game flow
- `src/app/app.html` - form controls, status text, board container (`div#board`)
- `src/app/app-store.ts` - central game state and update methods
- `src/app/board-service.ts` - Sugoku HTTP calls and board encoding
- `src/app/enums/boards.ts` - core game types (`BoardDifficulty`, `BoardStatus`, `GameStatus`)
