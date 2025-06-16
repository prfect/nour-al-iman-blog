module.exports = function(eleventyConfig) {
  // Importer les filtres personnalisés
  require('./_includes/filters.js')(eleventyConfig);
  
  // Copier les fichiers statiques
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  
  // Configuration des collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md");
  });
  
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_pages/*.md");
  });

  eleventyConfig.addCollection("categoryPosts", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("_posts/*.md");
    const categories = {};
    
    posts.forEach(post => {
      const category = post.data.category;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(post);
    });
    
    return categories;
  });
  
  // Filtre pour générer l'année actuelle
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // Configuration pour la navigation
  eleventyConfig.addFilter("getPreviousCollectionItem", (collection, item) => {
    const currentIndex = collection.findIndex(collectionItem => collectionItem.url === item.url);
    if (currentIndex === 0) return null;
    return collection[currentIndex - 1];
  });
  
  eleventyConfig.addFilter("getNextCollectionItem", (collection, item) => {
    const currentIndex = collection.findIndex(collectionItem => collectionItem.url === item.url);
    if (currentIndex === collection.length - 1) return null;
    return collection[currentIndex + 1];
  });
  
  // Configuration markdown
  const markdownIt = require("markdown-it");
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  
  eleventyConfig.setLibrary("md", markdownIt(markdownItOptions));

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
