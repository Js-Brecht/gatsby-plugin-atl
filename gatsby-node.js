"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = require("typescript");
var ts_transform_paths_1 = __importDefault(require("ts-transform-paths"));
exports.onCreateWebpackConfig = function (_a, pluginOptions) {
    var loaders = _a.loaders, actions = _a.actions;
    var transformer = undefined;
    var compilerOptions = {
        module: typescript_1.ModuleKind.ESNext,
        target: typescript_1.ScriptTarget.ESNext,
        noEmit: true
    };
    if (pluginOptions) {
        pluginOptions.plugins && delete pluginOptions.plugins;
        pluginOptions.ignoreAliases && delete pluginOptions.ignoreAliases;
        if (!pluginOptions.ignoreAliases) {
            transformer = function () { return ts_transform_paths_1.default(); };
        }
        if (pluginOptions && pluginOptions.compilerOptions) {
            Object.assign(compilerOptions, pluginOptions.compilerOptions);
            delete pluginOptions.compilerOptions;
        }
    }
    var defaultOptions = {
        compilerOptions: compilerOptions,
        getCustomTransformers: transformer
    };
    var options = Object.assign({}, defaultOptions, pluginOptions);
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
                            options: options
                        },
                    ],
                },
            ],
        },
    });
};
exports.resolvableExtensions = function () { return [".ts", ".tsx", ".js", ".jsx"]; };
