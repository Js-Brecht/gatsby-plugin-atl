import { LoaderConfig } from 'awesome-typescript-loader/dist/interfaces';
import { CreateWebpackConfigArgs, PluginOptions as GatsbyPluginOptions, PluginCallback } from 'gatsby';

/**
 * This is the same LoaderConfig interface that `awesome-typescript-loader` uses,
 * extended with options specific with this plugin.
 *
 * For more details about the plugin options, please see [Awesome Typescript Loader's loader-options documentation]{@link https://github.com/s-panferov/awesome-typescript-loader/#loader-options}
 */
export interface AtlPluginOptions extends LoaderConfig {
	/** - Disables the use of `ts-transform-paths` */
	ignoreAliases?: boolean;
}

/**
 * This is `awesome-typescript-loader` extended with the options Gatsby provides to `onCreateWebpack()`
 * API endpoint
 *
 */
export interface PluginOptions extends Pick<GatsbyPluginOptions, 'plugins'>, AtlPluginOptions { }

/**
 * Same interface that gatsby uses for the `onCreateWebpackConfig()` function
 */
export type WebpackConfigFn = (
	args: CreateWebpackConfigArgs,
	options?: PluginOptions,
	callback?: PluginCallback
) => void;
