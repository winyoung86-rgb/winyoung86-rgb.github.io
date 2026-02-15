module.exports = function (eleventyConfig) {
  // Date filter for posts (use UTC to prevent timezone offset issues)
  eleventyConfig.addFilter("dateDisplay", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Posts collection sorted by date descending (newest first)
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("posts").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    pathPrefix: "/blog/",
  };
};
