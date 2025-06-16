module.exports = function(eleventyConfig) {
  // Copier les fichiers statiques
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  
  // Filtre de date simplifié
  eleventyConfig.addFilter("formatDate", function(date) {
    return new Date(date).toLocaleDateString('ar');
  });
  
  // Année actuelle
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
