import { CompilerOptions, Program, CustomTransformers } from 'typescript';
import { CreateWebpackConfigArgs, PluginOptions, PluginCallback } from 'gatsby';

/**
 * The Transformers type used in LoaderConfig
 */
export type Transformers = string | ((program: Program) => CustomTransformers | undefined);

/**
 * This is the same LoaderConfig interface that `awesome-typescript-loader` uses
 */
export interface LoaderConfig {
    ignoreAliases?: boolean;
    instance?: string;
    compiler?: string;
    configFileName?: string;
    configFileContent?: string;
    forceIsolatedModules?: boolean;
    errorsAsWarnings?: boolean;
    transpileOnly?: boolean;
    ignoreDiagnostics?: number[];
    compilerOptions?: CompilerOptions;
    useTranspileModule?: boolean;
    useBabel?: boolean;
    babelCore?: string;
    babelOptions?: any;
    usePrecompiledFiles?: boolean;
    silent?: boolean;
    useCache?: boolean;
    cacheDirectory?: string;
    entryFileIsJs?: boolean;
    debug?: boolean;
    reportFiles?: string[];
    context?: string;
    getCustomTransformers?: Transformers;
}

/**
 * Same interface that gatsby uses for the `onCreateWebpackConfig()` function
 */
export type WebpackConfigFn = (
    args: CreateWebpackConfigArgs,
    options?: PluginOptions & LoaderConfig,
    callback?: PluginCallback
) => void;
