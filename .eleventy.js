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
  
  // Filter pour filtrer les articles par catégorie
  eleventyConfig.addFilter("filter", function(array, key, value) {
    if (!array || !Array.isArray(array)) return [];
    return array.filter(item => {
      if (!item || !item.data) return false;
      const keyPath = key.split('.');
      let dataValue = item.data;
      for (const k of keyPath) {
        if (!dataValue || typeof dataValue !== 'object') return false;
        dataValue = dataValue[k];
      }
      return dataValue === value;
    });
  });
  
  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/**/*.md");
  });
  
  eleventyConfig.addCollection("categories", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("_posts/**/*.md");
    let categories = new Set();
    
    posts.forEach(item => {
      if (item.data.category) {
        categories.add(item.data.category);
      }
    });
    
    return Array.from(categories);
  });
  
  // Génération de l'index de recherche
  eleventyConfig.addCollection("searchIndex", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/**/*.md").map(item => {
      return {
        url: item.url,
        title: item.data.title || "",
        excerpt: item.data.excerpt || "",
        content: (item.templateContent || "").replace(/<[^>]*>/g, '').slice(0, 5000),
        date: item.data.date ? new Date(item.data.date).toLocaleDateString('ar-MA') : "",
        thumbnail: item.data.thumbnail || "",
        category: item.data.category || "",
        author: item.data.author || ""
      };
    });
  });
  
  // Year shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
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
