module.exports = function(eleventyConfig) {
  // Passthrough file copy
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  
  // Date filter
  eleventyConfig.addFilter("formatDate", function(date) {
    if (!date) return '';
    const d = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('ar-MA', options);
  });
  
  // Limit filter
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  // Related posts filter
  eleventyConfig.addFilter("relatedByTags", function(collection, post) {
    const postTags = post.data.tags || [];
    
    return collection.filter(item => {
      // Don't include the current post
      if (item.url === post.url) return false;
      
      // Check for tag overlap
      const itemTags = item.data.tags || [];
      return itemTags.some(tag => postTags.includes(tag));
    });
  });
  
  // Year shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/**/*.md");
  });
  
  eleventyConfig.addCollection("categories", function(collectionApi) {
    let categories = new Set();
    
    collectionApi.getAll().forEach(item => {
      if (item.data.category) {
        categories.add(item.data.category);
      }
    });
    
    return Array.from(categories);
  });
  
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    let tagSet = new Set();
    
    collectionApi.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        
        if (Array.isArray(tags)) {
          for (const tag of tags) {
            tagSet.add(tag);
          }
        }
      }
    });
    
    return Array.from(tagSet).sort();
  });
  
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
