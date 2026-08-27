22:21:55 [check] Getting diagnostics for Astro files in /home/rdp77/Projects/Website/showcase...
src/components/Seo.astro:43:38 - warning astro(4000): This script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

43 {jsonLdBlocks.map((block) => <script type="application/ld+json" set:html={JSON.stringify(block)} />)}
                                        ~~~~

src/layouts/BaseLayout.astro:95:13 - warning astro(4000): This script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

95     <script type="application/ld+json" set:html={JSON.stringify(sharedJsonLd)} />
               ~~~~

Result (33 files): 
- 0 errors
- 0 warnings
- 2 hints
