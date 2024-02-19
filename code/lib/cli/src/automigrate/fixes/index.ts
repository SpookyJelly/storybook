import type { Fix } from '../types';

import { cra5 } from './cra5';
import { webpack5 } from './webpack5';
import { vue3 } from './vue3';
import { mdxgfm } from './mdx-gfm';
import { eslintPlugin } from './eslint-plugin';
import { builderVite } from './builder-vite';
import { viteConfigFile } from './vite-config-file';
import { sbScripts } from './sb-scripts';
import { sbBinary } from './sb-binary';
import { newFrameworks } from './new-frameworks';
import { removedGlobalClientAPIs } from './remove-global-client-apis';
import { autodocsTrue } from './autodocs-true';
import { angularBuilders } from './angular-builders';
import { angularBuildersMultiproject } from './angular-builders-multiproject';
import { wrapRequire } from './wrap-require';
import { reactDocgen } from './react-docgen';
import { removeReactDependency } from './prompt-remove-react';
import { storyshotsMigration } from './storyshots-migration';
import { webpack5CompilerSetup } from './webpack5-compiler-setup';
import { removeJestTestingLibrary } from './remove-jest-testing-library';

export * from '../types';

export const allFixes: Fix[] = [
  newFrameworks,
  cra5,
  webpack5,
  vue3,
  viteConfigFile,
  eslintPlugin,
  builderVite,
  sbBinary,
  sbScripts,
  removeJestTestingLibrary,
  removedGlobalClientAPIs,
  mdxgfm,
  autodocsTrue,
  angularBuildersMultiproject,
  angularBuilders,
  wrapRequire,
  reactDocgen,
  storyshotsMigration,
  removeReactDependency,
  webpack5CompilerSetup,
];

export const initFixes: Fix[] = [eslintPlugin];
