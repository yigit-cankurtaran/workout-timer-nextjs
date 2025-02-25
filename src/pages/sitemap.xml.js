const EXTERNAL_DATA_URL =
  "https://yigit-cankurtaran.github.io/workout-timer-nextjs";

// Get the current date in ISO format for the lastmod field
const getCurrentDate = () => new Date().toISOString();

// Define the pages with their metadata
const pages = [
  {
    url: "",
    changefreq: "monthly",
    priority: 1.0,
  },
  {
    url: "/timers/hiit",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    url: "/timers/tabata",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    url: "/timers/emom",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    url: "/timers/amrap",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    url: "/timers/for-time",
    changefreq: "monthly",
    priority: 0.8,
  },
];

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(
         (page) => `
       <url>
         <loc>${EXTERNAL_DATA_URL}${page.url}</loc>
         <lastmod>${getCurrentDate()}</lastmod>
         <changefreq>${page.changefreq}</changefreq>
         <priority>${page.priority}</priority>
       </url>
     `
       )
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We generate the XML sitemap with the pages data
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
