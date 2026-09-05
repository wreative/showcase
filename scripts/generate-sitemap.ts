import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE_URL = 'https://showcase.wreative.com';

const toSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

interface ParsedEntry {
  title: string;
  platform: string;
  category: string;
  url: string;
  description: string;
  tags: string[];
}

// Find `entry(` and extract body by matching balanced parentheses
function findEntryBodies(content: string): string[] {
  const bodies: string[] = [];
  let i = 0;
  while (i < content.length) {
    const start = content.indexOf('entry(', i);
    if (start === -1) break;
    const startDepth = 0;
    let depth = 0;
    let inDq = false;
    let inSq = false;
    let j = start + 5;
    for (; j < content.length; j++) {
      const ch = content[j];
      const prev = j > 0 ? content[j - 1] : '';
      if (ch === '"' && prev !== '\\') inDq = !inDq;
      else if (!inDq && ch === "'" && prev !== '\\') inSq = !inSq;
      else if (!inDq && !inSq) {
        if (ch === '(') depth++;
        else if (ch === ')') {
          depth--;
          if (depth === startDepth) break;
        }
      }
    }
    bodies.push(content.slice(start + 6, j));
    i = j + 1;
  }
  return bodies;
}

function parseEntry(body: string): ParsedEntry | null {
  const strings = extractStrings(body);
  if (strings.length < 6) return null;

  const tagsMatch = body.match(/\[((?:[^[\]]*|["'][^"']*["'])*)\]/);
  const tags: string[] = [];
  if (tagsMatch) {
    const tagRegex = /(["'])([^"']+)\1/g;
    let tm: RegExpExecArray | null;
    while ((tm = tagRegex.exec(tagsMatch[1])) !== null) {
      tags.push(tm[2]);
    }
  }

  return {
    title: strings[0],
    platform: strings[1],
    category: '',
    url: strings[2],
    description: strings[3],
    tags,
  };
}

function extractStrings(text: string): string[] {
  const strings: string[] = [];
  const regex = /(["'])((?:[^\\]|\\.)*?)\1/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    strings.push(m[2].replace(/\\(.)/g, '$1'));
  }
  return strings;
}

// -- Main --

const portfolioDir = resolve(import.meta.dirname, '../src/data/portfolio');
const entries: ParsedEntry[] = [];

for (const name of ['websites.ts', 'mobiles.ts']) {
  const content = readFileSync(resolve(portfolioDir, name), 'utf-8');
  const bodies = findEntryBodies(content);
  for (const body of bodies) {
    const parsed = parseEntry(body);
    if (parsed) entries.push(parsed);
  }
}

console.log(`Found ${entries.length} portfolio entries`);

// --- Sitemap ---

const lastmod = new Date().toISOString().slice(0, 10);
const sitemapUrls: { loc: string; changefreq: string; priority: string }[] = [
  { loc: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' },
];

for (const entry of entries) {
  sitemapUrls.push({
    loc: `${BASE_URL}/project/${toSlug(entry.title)}`,
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
