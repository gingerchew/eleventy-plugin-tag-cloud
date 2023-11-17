// Example use for the demo plugin:
// {{ 'Steph' | hello | safe }}

const _defaults = {
  tagKey: 'tags',
}

module.exports = (eleventyConfig, _options) => {
  const {
    tagKey
  } = {
    ..._defaults,
    ..._options
  };

  eleventyConfig.addFilter('tagCloud', (posts = []) => {
    if (!posts.length) throw new Error('[@tagCloud]: Invalid collection passed, no items');

    const tagSet = new Set();

    for (const post of posts) {
      const tags = post.data[tagKey]
      tags.forEach(tag => tagSet.add(tag));
    }
    
    const tags = [...tagSet];
    
    return tags;
  });

  eleventyConfig.addFilter('tagMap', (posts) => {
    if (!posts.length) throw new Error('[@tagCloud]: Invalid collection passed, no items');

    const tagMap = new Map();

    for (const post of posts) {
      const tags = post.data[tagKey];

      tags.forEach(tag => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, []);
        }
        tagMap.get(tag).push(post);
      });
    }

    const tagObj = Object.assign({}, ...Array.from(tagMap.entries(), ([tag, posts]) => ({ [tag]: posts })));

    return tagObj;
  })
};

