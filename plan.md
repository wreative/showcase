## Task

Saya memiliki project existing yang saat ini menggunakan React/JSX. Tolong migrasikan project tersebut sepenuhnya ke **Astro** dengan mempertahankan tampilan, layout, dan seluruh fungsi yang sudah ada.

### 1. Migrasi ke Astro

* Convert project dari React/JSX ke Astro.
* Gunakan `.astro` sebagai format utama untuk seluruh UI.
* **Tidak boleh ada file `.jsx`, `.tsx`, atau komponen React tersisa** setelah migrasi.
* Hapus dependency React yang sudah tidak diperlukan dari `package.json`.
* Sesuaikan struktur project agar mengikuti best practice Astro.
* Jangan melakukan rewrite yang tidak diperlukan terhadap business logic atau behavior existing.
* Pertahankan seluruh routing, content, asset, interaction, animation, dan functionality yang sudah ada.
* Jika terdapat functionality yang sebelumnya membutuhkan React, implementasikan kembali menggunakan:

  * Astro components
  * native JavaScript
  * browser APIs
  * atau pendekatan Astro yang paling sederhana dan maintainable
* Jangan mengganti functionality dengan implementasi yang lebih kompleks hanya karena memungkinkan.

### 2. Visual Parity

Prioritas utama adalah **tampilan tidak berubah**.

Pastikan setelah migrasi:

* Layout tetap sama.
* Spacing tetap sama.
* Typography tetap sama.
* Font tetap sama.
* Warna tetap sama.
* Responsive behavior tetap sama.
* Navbar/header tetap sama.
* Footer tetap sama.
* Image sizing dan positioning tetap sama.
* Animation dan transition tetap sama.
* Hover/focus/active state tetap sama.
* Mobile/tablet/desktop layout tetap sama.
* Jangan melakukan redesign.
* Jangan menambahkan komponen UI baru yang tidak ada sebelumnya.
* Jangan mengubah copy/content kecuali memang diperlukan untuk migrasi.

Jika ada perbedaan antara implementasi lama dan Astro, prioritaskan **pixel-level visual parity** daripada melakukan simplifikasi visual.

### 3. Header: Light & Dark Mode Assets

Untuk bagian header, buat mekanisme yang memungkinkan asset gambar/logo berbeda untuk light mode dan dark mode.

Contohnya:

* `logo-light`
* `logo-dark`

Asset harus otomatis menggunakan versi yang sesuai dengan theme yang sedang aktif.

Gunakan pendekatan Astro/native CSS yang clean dan tidak membutuhkan React hanya untuk kebutuhan ini.

Pastikan:

* Light mode menggunakan asset light.
* Dark mode menggunakan asset dark.
* Tidak terjadi flash atau broken image ketika theme berubah.
* Tetap responsive.
* Tidak mengubah tampilan header existing.

### 4. SEO Audit

Setelah migrasi, lakukan audit SEO secara menyeluruh.

Pastikan setiap halaman memiliki:

* `<title>` yang relevan dan unik.
* `<meta name="description">`.
* Canonical URL jika diperlukan.
* Open Graph metadata.
* Twitter/X card metadata.
* `lang` attribute yang benar pada `<html>`.
* Semantic HTML.
* Heading hierarchy yang benar (`h1`, `h2`, `h3`, dst.).
* Image `alt` yang relevan.
* Image dimensions/aspect ratio untuk menghindari layout shift.
* Internal links yang crawlable.
* Clean URL structure.
* Tidak ada duplicate metadata.
* Tidak ada accidental `noindex`.
* Sitemap jika project memang membutuhkannya.
* `robots.txt` jika diperlukan.
* Structured data/schema markup jika relevan dengan jenis halaman.

Jangan menambahkan SEO implementation yang berlebihan jika tidak relevan dengan project.

### 5. Performance

Sekalian audit performa setelah migrasi.

Pastikan:

* Tidak ada JavaScript yang tidak diperlukan.
* Hindari hydration/client-side framework jika tidak dibutuhkan.
* Gunakan Astro untuk menghasilkan static HTML sebanyak mungkin.
* Optimalkan loading asset.
* Gunakan lazy loading untuk image yang sesuai.
* Jangan mengorbankan visual parity.
* Hindari dependency yang tidak diperlukan.
* Jangan mempertahankan React hanya untuk functionality yang sebenarnya dapat dilakukan dengan native JavaScript.

### 6. Cleanup

Setelah migrasi selesai, lakukan cleanup menyeluruh.

Cari dan hapus:

* File `.jsx`.
* File `.tsx`.
* React components yang sudah tidak digunakan.
* React dependencies yang sudah tidak digunakan.
* Import yang tidak digunakan.
* Utility yang tidak digunakan.
* CSS yang tidak digunakan jika dapat diidentifikasi dengan aman.
* Asset yang tidak digunakan jika dapat dipastikan aman untuk dihapus.
* Configuration lama yang hanya diperlukan oleh React.
* Dependency yang tidak lagi diperlukan.

**Jangan menghapus sesuatu hanya berdasarkan asumsi.** Pastikan benar-benar tidak digunakan.

### 7. Package & Configuration

Review:

* `package.json`
* `astro.config.*`
* `tsconfig.json`
* build configuration
* lint configuration
* formatting configuration
* environment variables
* scripts

Pastikan project memiliki setup Astro yang clean dan tidak meninggalkan konfigurasi framework lama yang sudah tidak relevan.

Jangan mengganti package manager. Tetap gunakan **pnpm**.

### 8. Validation

Setelah semua perubahan selesai, **wajib menjalankan**:

```bash
pnpm run lint
```

Kemudian:

```bash
pnpm run knip
```

Perbaiki seluruh error yang ditemukan.

Untuk `knip`, gunakan hasil audit untuk memastikan:

* Tidak ada unused files.
* Tidak ada unused exports.
* Tidak ada unused dependencies.
* Tidak ada unused devDependencies.
* Tidak ada dead code yang tersisa.

Jika `knip` menemukan sesuatu yang memang sengaja digunakan secara dynamic atau false positive, jangan asal menghapusnya. Evaluasi terlebih dahulu dan konfigurasi Knip secara tepat bila memang diperlukan.

### 9. Final Verification

Sebelum dianggap selesai, lakukan checklist berikut:

* [ ] Semua UI sudah menggunakan Astro.
* [ ] Tidak ada `.jsx`.
* [ ] Tidak ada `.tsx`.
* [ ] Tidak ada React component.
* [ ] React dependency sudah dihapus jika tidak diperlukan.
* [ ] Visual existing tetap sama.
* [ ] Responsive behavior tetap sama.
* [ ] Header mendukung asset light/dark mode.
* [ ] SEO sudah diaudit.
* [ ] Metadata halaman sudah benar.
* [ ] Accessibility dasar sudah diperiksa.
* [ ] Tidak ada unused import.
* [ ] Tidak ada unused dependency.
* [ ] Tidak ada dead code.
* [ ] `pnpm run lint` berhasil tanpa error.
* [ ] `pnpm run knip` berhasil tanpa error atau warning yang tidak justified.
* [ ] Project dapat di-build dengan normal.

### Prinsip Penting

Jangan hanya melakukan mechanical conversion dari React ke Astro.

Saya ingin hasil akhir berupa **Astro project yang benar-benar native Astro**, clean, maintainable, SEO-friendly, performant, dan bebas dependency React yang tidak diperlukan.

Namun, **jangan mengubah desain atau behavior existing**. Migrasi framework bukan alasan untuk melakukan redesign. Manusia sudah cukup sering merusak UI yang sebenarnya sudah bekerja dengan alasan "sekalian dibagusin".

Jika menemukan bagian yang ambiguous, pilih implementasi yang paling sederhana, idiomatic Astro, dan paling dekat dengan behavior existing.
