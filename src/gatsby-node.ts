import {
	ModuleKind,
	ModuleResolutionKind,
	ScriptTarget,
	CompilerOptions,
	JsxEmit
} from 'typescript';
import { LoaderConfig, WebpackConfigFn, Transformers } from './types';
import TsTransformPaths from 'ts-transform-paths';

/**
 * Integrates `awesome-typescript-loader` into Gatsby's webpack configuration
 * @param {CreateWebpackConfigArgs} config The configuration options that are passed in by
 * `gatsby`.
 * @param {LoaderConfig} pluginOptions The options provided by the user from `gatsby-config`
 * * These are merged with the default configuration options.
 * * Any options specified here will override the defaults.
 */
export const onCreateWebpackConfig: WebpackConfigFn = (
	{
		stage,
		loaders,
		actions
	},
	pluginOptions
): void => {
	let transformer: Transformers | undefined = undefined;

	// These are default compilerOptions that are required for this
	// plugin to work correctly.
	let compilerOptions: CompilerOptions = {
		module: ModuleKind.ESNext,
		target: ScriptTarget.ESNext,
		noEmit: true,
		moduleResolution: ModuleResolutionKind.NodeJs,
		lib: ["dom"],
		jsx: JsxEmit.React
	}

	// Remove options from the `pluginOptions` that will not be used by
	// webpack.
	if (pluginOptions) {
		// The default pluginOptions contains plugins[]... empty array, generally
		// Not entirely sure what it's for, but I'm not using it here, and if it
		// gets fed into the loader options, it will cause it to fail in odd ways.
		pluginOptions.plugins && delete pluginOptions.plugins;

		// If the end-user has decided to exclude alias transformation, then don't
		// define `transformer()`.  The option also has to be deleted from their input
		// because it is not a valid option for `awesome-typescript-loader`
		if (!pluginOptions.ignoreAliases) {
			transformer = () => TsTransformPaths();
		}
		if (pluginOptions.hasOwnProperty('ignoreAliases')) {
			delete pluginOptions.ignoreAliases;
		}

		// If compilerOptions are included, merge them into the default
		// ones, overriding the defaults
		if (pluginOptions && pluginOptions.compilerOptions) {
			Object.assign(
				compilerOptions,
				pluginOptions.compilerOptions
			)
			delete pluginOptions.compilerOptions;
		}
	}

	// Default settings to use for this plugin
	const defaultOptions: LoaderConfig = {
		// compiler: require.resolve('ttypescript'),
		compilerOptions,
		getCustomTransformers: transformer
	}


	// Compile the loader options.  If additional options are included
	// by the end user, then override the defaults with them.
	const options = Object.assign(
		{},
		defaultOptions,
		pluginOptions
	);

	switch (stage) {
		case "build-javascript":
		case "build-html":
		case "develop": {
			actions.setWebpackConfig({
				module: {
					rules: [
						{
							test: /\.tsx?$/,
							exclude: /node_modules/,
							use: [
								loaders.js(),
								{
									loader: require.resolve("awesome-typescript-loader"),
									options
								},
							],
						},
					],
				},
			});
			break;
		}
	}
};

/**
 * These are the lists of extensions for this plugin to process
 * Currently, it is processing all `typescript` and `javascript`,
 * `awesome-typescript-loader` is intelligent enough to ignore javascript
 * files if they are not processed.
 * * References: `['.ts', '.tsx', '.js', '.jsx']`
 */
export const resolvableExtensions = (): string[] => [".ts", ".tsx", ".js", ".jsx"];
