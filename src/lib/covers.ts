// Resolves a portfolio cover image's data path (e.g. "/assets/cover/foo.webp", as
// stored in src/data/portfolio) to its build-optimized ImageMetadata, so components
// can pass it straight into <Image>. The files live in src/assets/cover so Astro's
// image pipeline can process them; import.meta.glob is required here because the
// exact filename isn't known until a specific portfolio entry is being rendered.
const covers = import.meta.glob<{ default: ImageMetadata }>('/src/assets/cover/*.webp', {
  eager: true,
});

export function getCoverImage(path: string): ImageMetadata {
  const key = path.replace('/assets/cover/', '/src/assets/cover/');
  const mod = covers[key];
  if (!mod) {
    throw new Error(`getCoverImage: no image found for "${path}" (looked up "${key}")`);
  }
  return mod.default;
}
