// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: "https://beyondrenewables.in",
//   //   generateRobotsTxt: true, // Generates robots.txt
//   //   // exclude: ["/admin"], // Exclude pages
//   //   sitemapSize: 5000, // Split sitemap if large

//   generateRobotsTxt: true, // Generate robots.txt
//   sitemapSize: 5000, // Split sitemap if too large
//   generateIndexSitemap: false, // Ensure it generates actual pages
//   exclude: ["/admin", "/dashboard"], // Exclude specific routes
//   robotsTxtOptions: {
//     policies: [
//       { userAgent: "*", allow: "/" },
//       { userAgent: "*", disallow: ["/admin", "/dashboard"] },
//     ],
//   },
// };

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://example.in", // Replace with your actual domain
  generateRobotsTxt: true, // Generates robots.txt file
  generateIndexSitemap: false, // Generates all pages in a single sitemap
  sitemapSize: 5000, // Max URLs per sitemap
  // exclude: ["/admin", "/dashboard"], // Exclude specific pages

  // Manually define static paths since "output: export" doesn't work dynamically
  additionalPaths: async (config) => [
    { loc: "/", lastmod: new Date().toISOString(), priority: 1.0 },
    { loc: "/about", lastmod: new Date().toISOString(), priority: 0.8 },
    { loc: "/contact", lastmod: new Date().toISOString(), priority: 0.7 },
    { loc: "/product", lastmod: new Date().toISOString(), priority: 0.7 },
    {
      loc: "/decommissioning",
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    { loc: "/digitization", lastMod: new Date().toISOString(), priority: 0.7 },
    {
      loc: "/solar-recycling",
      lastmod: new Date().toISOString(),
      priority: 0.7,
    },
    { loc: "/blog", lastMod: new Date().toISOString(), priority: 0.6 },
    {
      loc: "/blog/solar-panel-recyling",
      lastmod: new Date().toISOString(),
      priority: 0.6,
    },
    {
      loc: "/blog/solar-panel-waste",
      lastmod: new Date().toISOString(),
      priority: 0.6,
    },
    {
      loc: "/privacy-policy",
      lastmod: new Date().toISOString(),
      priority: 0.3,
    },
    {
      loc: "/term-condition",
      lastmod: new Date().toISOString(),
      priority: 0.3,
    },
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" }, // Allow all pages
      // { userAgent: "*", disallow: ["/admin", "/dashboard"] }, // Block certain pages
    ],
  },
};
