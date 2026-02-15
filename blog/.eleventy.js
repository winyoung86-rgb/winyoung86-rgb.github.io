module.exports = function(eleventyConfig) {
  // Date filter for posts
  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    pathPrefix: "/blog/"
  };
};
