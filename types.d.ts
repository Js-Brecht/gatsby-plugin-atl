import { CompilerOptions, Program, CustomTransformers } from 'typescript';
import { CreateWebpackConfigArgs, PluginOptions, PluginCallback } from 'gatsby';
export declare type Transformers = string | ((program: Program) => CustomTransformers | undefined);
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
export declare type WebpackConfigFn = (args: CreateWebpackConfigArgs, options?: PluginOptions & LoaderConfig, callback?: PluginCallback) => void;
