import { join } from "path";

/**
 * The published CLI is a single esbuild bundle in dist/, so every module's
 * `__dirname` is dist/ and the non-JS assets of the workspace packages it
 * bundles are copied next to it by scripts/bundle.mjs (which also sets the
 * flag below). Unbundled builds (`pnpm cli:dev`, tests) leave these undefined
 * so each package falls back to the assets shipped alongside its own code.
 *
 * The directory names must match scripts/bundle-assets.mjs.
 */
const IS_BUNDLED = process.env.METICULOUS_CLI_BUNDLED === "true";

// Each asset path below is a hardcoded literal (never a caller-supplied
// value), so these cannot be used for path traversal.
export const debugWorkspaceTemplatesDir = IS_BUNDLED
  ? join(__dirname, "debug-workspace-templates")
  : undefined;

export const replayDebuggerUiDir = IS_BUNDLED
  ? join(__dirname, "replay-debugger-ui-out")
  : undefined;

/**
 * The CLI's own onboard templates. This module sits at the root of both src/
 * and dist/, so the relative path holds for source, tsc and bundled builds.
 */
export const onboardTemplatesDir = join(
  __dirname,
  "commands",
  "onboard",
  "templates",
);
