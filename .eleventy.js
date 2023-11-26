
const _defaults = {
  ignore: ['posts']
}

module.exports = (eleventyConfig, _options) => {
  const ignore = [
    ..._defaults.ignore,
    ...(_options?.ignore ?? [])
  ]

  eleventyConfig.addFilter('tagCloudIndex', (posts = []) => {
    if (!posts.length) throw new Error('[@tagCloudIndex]: Invalid collection passed, no items');

    const tagMap = new Map();

    for (const post of posts) {
      const tags = post.data.tags;

      tags?.forEach(tag => tagMap.set(tag, (tagMap.get(tag) || 0) + 1));
    }

    for (const _ignore of ignore) {
      if (tagMap.has(_ignore)) tagMap.delete(_ignore);
    }
    
    return [...tagMap.entries()].map(([key, value]) => {
      return {
        tagName: key,
        tagAmount: value
      }
    })
  })

  eleventyConfig.addFilter('tagCloud', (posts = []) => {
    if (!posts.length) throw new Error('[@tagCloud]: Invalid collection passed, no items');

    const tagSet = new Set();

    for (const post of posts) {
      const { tags } = post.data;

      tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    for (const _ignore of ignore) {
      if (tagSet.has(_ignore)) tagSet.delete(_ignore);
    }

    const tags = [...tagSet];

    return tags;
  });
};

