## Eleventy Plugin Template

> Bring back tag clouds you cowards

## Usage

```bash
npm install eleventy-plugin-tag-cloud
```

Then, include it in your `.eleventy.js` config file:

```js
const EleventyPluginTagCloud = require("eleventy-plugin-tag-cloud");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(EleventyPluginTagCloud);
};
```

## Config Options

| Option      | Type | Default       |
| ----------- | ---- | ------------- |
| ignore | string[] | [] |

## Config Examples

```js
module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(EleventyPluginTagCloud, {
    ignore: [ 'posts' ]
  });
}
```

## Credits

- The incredible [11ty plugin boilerplate](https://github.com/5t3ph/eleventy-plugin-template) by [Stephanie Eckles](https://thinkdobecreate.com/)