
const _defaults = {
  ignore: ['posts']
}

module.exports = (eleventyConfig, _options) => {
  const {
    ignore
  } = {
    ..._defaults,
    ..._options
  };

  eleventyConfig.addFilter('tagCloud', (posts = []) => {
    if (!posts.length) throw new Error('[@tagCloud]: Invalid collection passed, no items');

    const tagSet = new Set();

    for (const post of posts) {
      const { tags } = post.data;
      tags.forEach(tag => tagSet.add(tag));
    }
    
    for (const _ignore of ignore) {
      if (tagSet.has(_ignore)) tagSet.delete(_ignore);
    }

    const tags = [...tagSet];

    return tags;
  });
};

