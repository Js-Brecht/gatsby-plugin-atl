# Awesome Typescript Loader plugin for Gatsby

This plugin will integrate `awesome-typescript-loader` into the webpack config
to enable typescript support in Gatsby.  After `ts` files are compiled, they are
then fed into the standard gatsby `loaders.js()` (babel-loader, etc...), to try
to maintain compatibility.

---

## Defaults

By default, this plugin uses the npm package `tssform-paths` transformer-
function, so that you can use aliases from your `tsconfig.json`.

If you want to exclude this functionality, then include the `ignoreAliases` boolean
value in the plugin configuration in `gatsby-config.js`, like so:

```js
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    {
      resolve: 'gatsby-plugin-atl',
      options: {
        ignoreAliases: true
      }
    }
  ]
}
```

---

It will also set some `compilerOptions` for use during typescript compilation.
__**If these are not configured, then compilation tends to fail.  These options are:**__

* target: 'esnext'
* module: 'esnext'
* noEmit: true

---

## Plugin Options

For list of `pluginOptions` that are available for this plugin, see the
`awesome-typescript-loader` documentation at the following:
<https://github.com/s-panferov/awesome-typescript-loader/#loader-options>

---

## Additional extensibility

If you want to take full control of the compilation process, you can use a custom compiler.

I usually prefer to use `ttypescript` (<https://github.com/cevek/ttypescript>), because it gives you access to some cool transformer features.
To use `ttypescript`, first install it in your project

```sh
npm -D ttypescript
```

Then set the configuration options in `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  ...
  plugins: [
    {
      resolve: 'gatsby-plugin-atl',
      options: {
        compiler: 'ttypescript'
      }
    }
  ]
}
```

`ttypescript` will use your `tsconfig.json` by default, which is another cool feature.

Just make sure you use these options in your `tsconfig.json`

```json
{
  "module": "esnext",
  "target": "esnext",
  "noEmit": true
}
```
