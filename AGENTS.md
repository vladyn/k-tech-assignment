# AGENTS.md

## Codebase at a glance
- This is a single Angular 21 app (`k-tech-assesment`) using standalone APIs, not NgModules.
- Bootstrap flow is `src/main.ts` -> `bootstrapApplication(App, appConfig)`.
- App wiring lives in `src/app/app.config.ts` (global providers) and `src/app/app.routes.ts` (router table).
- The root component is `src/app/app.ts`; template is `src/app/app.html` (currently Angular starter placeholder content).
- Domain-specific code currently starts in `src/app/enums/endpoints.ts`.

## Key files to read first
- `package.json`: authoritative scripts (`start`, `build`, `watch`, `test`) and dependency versions.
- `angular.json`: build/serve/test targets, production budgets, and default configurations.
- `tsconfig.json`: strict TypeScript + strict Angular template settings.
- `src/app/enums/endpoints.ts`: external API URL construction and current endpoint constants.
- `src/app/app.spec.ts`: canonical test style for standalone components with TestBed.

## Developer workflows (project-specific)
- Install deps with npm (project pins `packageManager: npm@11.11.0`).
- Dev server uses Angular CLI defaults on port 4200 via `npm start`.
- Production build is default for `ng build`; development build is `npm run watch` (`--configuration development`).
- Unit tests run through Angular's unit-test builder + Vitest globals (`tsconfig.spec.json`).
- Qodana is configured in `qodana.yaml` with `jetbrains/qodana-js:2026.1`.

## Conventions and patterns already present
- Prefer standalone component imports (`imports: [RouterOutlet]`) over module declarations.
- Keep application-level providers in `src/app/app.config.ts`; keep routes in `src/app/app.routes.ts`.
- Keep API endpoint strings centralized in `src/app/enums/endpoints.ts` instead of scattering URLs.
- Preserve existing project naming (`k-tech-assesment` / `KTechAssesment`) unless doing an intentional repo-wide rename.
- Existing tests use Vitest-style globals (`describe`, `it`, `expect`) with Angular `TestBed`.

## Integration points and cross-component flow
- Current external integration target is Sugoku: ``https://sugoku.onrender.com/board?difficulty=${type}`` in `src/app/enums/endpoints.ts`.
- Difficulty is currently hardcoded via `type: difficulty = 'easy'`; changing retrieval behavior starts there.
- Router is enabled (`provideRouter(routes)`) but route table is empty, so all rendering is root-template driven for now.
- No HTTP provider is currently registered in `app.config.ts`; add it there when introducing API services.

## Existing guidance sources discovered
- `README.md` is the only project-level guidance file matched from the requested AI-instruction glob search.

