import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { portfolios } from '../src/data/portfolio';

const BASE_URL = 'https://showcase.wreative.com';

// -- Main --

const entries = portfolios;

console.log(`Found ${entries.length} portfolio entries`);

// --- Sitemap ---

const lastmod = new Date().toISOString().slice(0, 10);
type SitemapUrl = { loc: string; alt: [string, string]; changefreq: string; priority: string };
const pair = (path: string): [string, string] => [`${BASE_URL}${path}`, `${BASE_URL}/id${path}`];
const sitemapUrls: SitemapUrl[] = [];
const add = (path: string, changefreq: string, priority: string) => {
  const alt = pair(path);
  for (const loc of alt) sitemapUrls.push({ loc, alt, changefreq, priority });
};

add('/', 'weekly', '1.0');
for (const entry of entries) add(`/project/${entry.slug}`, 'monthly', '0.8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${u.alt[0]}"/>
    <xhtml:link rel="alternate" hreflang="id" href="${u.alt[1]}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.alt[0]}"/>
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
const webApps = entries.filter((e) => e.platform === 'web-app');

const llmsLines: string[] = [
  '# Wreative Showcase',
  '',
  '> Portfolio of website and mobile application projects by Wreative creative agency.',
  '> Author: Wreative | Location: Surabaya, Indonesia',
  '',
  `Total: ${entries.length} projects (${websites.length} websites, ${webApps.length} web apps, ${mobiles.length} mobile apps)`,
  '',
  '## Site Information',
  '',
  '- **Homepage (English):** https://showcase.wreative.com/',
  '- **Homepage (Indonesian):** https://showcase.wreative.com/id/',
  '- **Sitemap:** https://showcase.wreative.com/sitemap.xml',
  '- **Project pages:** https://showcase.wreative.com/project/<slug> (English) and https://showcase.wreative.com/id/project/<slug> (Indonesian), one page per project below',
  '- **Services:** Website development (WordPress, custom themes, e-commerce/LMS) and mobile application development.',
  '- **Categories:** Business, Education, E-Commerce, Government, Services, Florist & Gardening.',
  '- **Language:** English (/) and Indonesian (/id/), linked with hreflang.',
  '- **Legal entity:** PT. Wreative Digital Solutions Indonesia (legally established Indonesian company).',
  '- **NIB:** 1204250004487',
  '- **NPWP:** 1000000001461492',
  '',
];

const section = (heading: string, label: string, list: typeof entries) => {
  llmsLines.push(`## ${heading}`, '');
  list.forEach((e, i) => {
    llmsLines.push(`### ${i + 1}. ${e.title}`);
    llmsLines.push(`- **Platform:** ${label}`);
    llmsLines.push(`- **URL:** [${e.url}](${e.url})`);
    llmsLines.push(`- **Showcase page:** ${BASE_URL}/project/${e.slug} (id: ${BASE_URL}/id/project/${e.slug})`);
    llmsLines.push(`- **Tech:** ${e.tags.join(', ')}`);
    llmsLines.push(`- **Description:** ${e.description}`);
    llmsLines.push('');
  });
};

section('Websites', 'Website', websites);
section('Web Apps', 'Web App', webApps);
section('Mobile Apps', 'Mobile App', mobiles);

llmsLines.push('---');
llmsLines.push('This llms.txt follows the [llms.txt specification](https://llmstxt.org/).');
llmsLines.push('');

const llmsPath = resolve(import.meta.dirname, '../public/llms.txt');
writeFileSync(llmsPath, llmsLines.join('\n'));
console.log(`Generated ${llmsPath} with ${entries.length} projects`);
