/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.drvanigynaecologistbangalore.com",
  generateRobotsTxt: true, // will also generate /robots.txt
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,

  // Exclude any routes you don’t want indexed:
  exclude: [
    "/api/*",
    "/admin", // if you have an admin page
    "/admin/*",
  ],

  // Optional: custom robots rules
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api", "/admin", "/admin/*"] },
    ],
  },
};
