import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { portfolios } from '../src/data/portfolio';

const BASE_URL = 'https://showcase.wreative.com';

// -- Main --

const entries = portfolios;

console.log(`Found ${entries.length} portfolio entries`);

// --- Sitemap ---

const lastmod = new Date().toISOString().slice(0, 10);
const sitemapUrls: { loc: string; changefreq: string; priority: string }[] = [
  { loc: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' },
];

for (const entry of entries) {
  sitemapUrls.push({
    loc: `${BASE_URL}/project/${entry.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const sitemapPath = resolve(import.meta.dirname, '../public/sitemap.xml');
writeFileSync(sitemapPath, sitemap);
console.log(`Generated ${sitemapPath} with ${sitemapUrls.length} URLs`);

// --- llms.txt ---

const websites = entries.filter((e) => e.platform === 'website');
const mobiles = entries.filter((e) => e.platform === 'mobile');

const llmsLines: string[] = [
  '# Wreative Showcase',
  '',
  '> Portfolio of website and mobile application projects by Wreative creative agency.',
  '> Author: Wreative | Location: Surabaya, Indonesia',
  '',
  `Total: ${entries.length} projects (${websites.length} websites, ${mobiles.length} mobile apps)`,
  '',
  '## Site Information',
  '',
  '- **Homepage:** https://showcase.wreative.com/',
  '- **Sitemap:** https://showcase.wreative.com/sitemap.xml',
  '- **Project pages:** https://showcase.wreative.com/project/<slug> (one page per project below)',
  '- **Services:** Website development (WordPress, custom themes, e-commerce/LMS) and mobile application development.',
  '- **Categories:** Business, Education, E-Commerce, Government, Services, Florist & Gardening.',
  '- **Language:** English and Indonesian (en/id).',
  '- **Legal entity:** PT. Wreative Digital Solutions Indonesia (legally established Indonesian company).',
  '- **NIB:** 1204250004487',
  '- **NPWP:** 1000000001461492',
  '',
  '## Websites',
  '',
];

websites.forEach((e, i) => {
  llmsLines.push(`### ${i + 1}. ${e.title}`);
  llmsLines.push(`- **Platform:** Website`);
  llmsLines.push(`- **URL:** [${e.url}](${e.url})`);
  llmsLines.push(`- **Tech:** ${e.tags.join(', ')}`);
  llmsLines.push(`- **Description:** ${e.description}`);
  llmsLines.push('');
});

llmsLines.push('## Mobile Apps', '');

mobiles.forEach((e, i) => {
  llmsLines.push(`### ${i + 1}. ${e.title}`);
  llmsLines.push(`- **Platform:** Mobile App`);
  llmsLines.push(`- **URL:** [${e.url}](${e.url})`);
  llmsLines.push(`- **Tech:** ${e.tags.join(', ')}`);
  llmsLines.push(`- **Description:** ${e.description}`);
  llmsLines.push('');
});

llmsLines.push('---');
llmsLines.push('This llms.txt follows the [llms.txt specification](https://llmstxt.org/).');
llmsLines.push('');

const llmsPath = resolve(import.meta.dirname, '../public/llms.txt');
writeFileSync(llmsPath, llmsLines.join('\n'));
console.log(`Generated ${llmsPath} with ${entries.length} projects`);
