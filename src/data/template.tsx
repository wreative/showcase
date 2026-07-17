import fajarFloristCover from "../../assets/cover/fajar-florist.webp";
import waseBumiIndonesiaCover from "../../assets/cover/wase-bumi-indonesia.webp";
import firstMediaSurabayaCover from "../../assets/cover/first-media-surabaya.webp";
import kontraktorSurabayaCover from "../../assets/cover/kontraktor-surabaya.webp";
import wreativeCover from "../../assets/cover/wreative.webp";
import wreativeStoreCover from "../../assets/cover/wreative-store.webp";
import cubicleToiletCover from "../../assets/cover/cubicle-toilet.webp";
import DPUBinaMargaMusiCover from "../../assets/cover/dpu-bina-marga-musi.webp";
import adiKaryaPesonaCover from "../../assets/cover/adikarya-pesona.webp";
import homeBarakaCover from "../../assets/cover/home-baraka.webp";
import chickenExplorerCover from "../../assets/cover/chicken-explorer.webp";
import kurirPulsaCover from "../../assets/cover/kurir-pulsa.webp";
import panjiSemestaCover from "../../assets/cover/panji-semesta.webp";
import dzataLombokTransportCover from "../../assets/cover/dzata-lombok-transport.webp";
import pernikahanIni from "../../assets/cover/pernikahan-ini.webp";
import posSatpam from "../../assets/cover/pos-satpam.webp";
import toiletPortabel from "../../assets/cover/toilet-portabel.webp";
import ptModernCocoInternational from "../../assets/cover/pt-modern-coco-international.webp";
import spesialisKaranganBungaIndonesiaCover from "../../assets/cover/spesialis-karangan-bunga.webp";
import bemodeCover from "../../assets/cover/bemode.webp";
import sakpattanaJawaTimurCover from "../../assets/cover/sakpattana.webp";
import CVPutraKubotaCover from "../../assets/cover/cv-putra-kubota.webp";
import wahyuDewanagariCover from "../../assets/cover/wahyu-dewanagari.webp";
import avisoCover from "../../assets/cover/aviso.webp";
import lpkFurinkazanCover from "../../assets/cover/lpk-furinkazan.webp";
import robySaputraGrupCover from "../../assets/cover/roby-saputra-grup.webp";
import sgAcademyCover from "../../assets/cover/sg-academy.webp";

export enum TemplateCategory {
  SERVICES = "Services",
  BUSINESS = "Business",
  EDUCATION = "Education",
  ECOMMERCE = "E-Commerce",
  GOVERNMENT = "Government",
  FLORIST = "Florist & Gardening",
}

export interface TemplateData {
  id: number;
  title: string;
  category: TemplateCategory;
  image: string;
  url: string;
}

// Domain always pushed to the end of the listing.
const PRIMARY_DOMAIN = "wreative.com";

// Named-parameter builder — keeps entries terse (tuple-length short)
// while still catching argument-order mistakes at compile time,
// unlike a raw positional tuple array would.
const portfolio = (
  title: string,
  category: TemplateCategory,
  image: string,
  url: string,
): Omit<TemplateData, "id"> => ({ title, category, image, url });

const rawTemplates: Omit<TemplateData, "id">[] = [
  portfolio(
    "Kontraktor Surabaya",
    TemplateCategory.SERVICES,
    kontraktorSurabayaCover,
    "https://kontraktorsurabaya.wreative.com/",
  ),
  portfolio(
    "Wase Bumi Indonesia",
    TemplateCategory.BUSINESS,
    waseBumiIndonesiaCover,
    "https://wasebumiindonesia.wreative.com/",
  ),
  portfolio(
    "Cubicle Toilet",
    TemplateCategory.SERVICES,
    cubicleToiletCover,
    "https://cubicletoilet.wreative.com/",
  ),
  portfolio(
    "PT. Adikarya Pesona Intinusa",
    TemplateCategory.EDUCATION,
    adiKaryaPesonaCover,
    "https://adikaryapesona.wreative.com/",
  ),
  portfolio(
    "Wreative Store",
    TemplateCategory.ECOMMERCE,
    wreativeStoreCover,
    "https://store.wreative.com",
  ),
  portfolio(
    "Home Baraka",
    TemplateCategory.SERVICES,
    homeBarakaCover,
    "https://homebaraka.wreative.com/",
  ),
  portfolio(
    "Wreative",
    TemplateCategory.BUSINESS,
    wreativeCover,
    "https://wreative.com/",
  ),
  portfolio(
    "Fajar Florist",
    TemplateCategory.FLORIST,
    fajarFloristCover,
    "https://fajarflorist.wreative.com/",
  ),
  portfolio(
    "DPU Bina Marga Kabupaten Musi",
    TemplateCategory.GOVERNMENT,
    DPUBinaMargaMusiCover,
    "https://pamusiwaras.wreative.com/",
  ),
  portfolio(
    "First Media Surabaya",
    TemplateCategory.BUSINESS,
    firstMediaSurabayaCover,
    "https://firstmediasurabaya.wreative.com/",
  ),
  portfolio(
    "Wahyu Dewanagari",
    TemplateCategory.BUSINESS,
    wahyuDewanagariCover,
    "https://wahyudewanagari.wreative.com",
  ),
  portfolio(
    "Toilet Portable",
    TemplateCategory.SERVICES,
    toiletPortabel,
    "https://toilet-portabel.wreative.com",
  ),
  portfolio(
    "Sakpattana Jawa Timur",
    TemplateCategory.BUSINESS,
    sakpattanaJawaTimurCover,
    "https://sakpattana.wreative.com",
  ),
  portfolio(
    "Pos Satpam Surabaya",
    TemplateCategory.SERVICES,
    posSatpam,
    "https://pos-satpam.wreative.com",
  ),
  portfolio(
    "PT. Modern Coco International",
    TemplateCategory.BUSINESS,
    ptModernCocoInternational,
    "https://pt-modern-coco-international.wreative.com/",
  ),
  portfolio(
    "CV Putra Kubota",
    TemplateCategory.BUSINESS,
    CVPutraKubotaCover,
    "https://cv-putra-kubota.wreative.com",
  ),
  portfolio(
    "Pernikahan Ini",
    TemplateCategory.SERVICES,
    pernikahanIni,
    "https://pernikahanini.com",
  ),
  portfolio(
    "Chicken Explorer",
    TemplateCategory.BUSINESS,
    chickenExplorerCover,
    "https://chicken-explorer.wreative.com/",
  ),
  portfolio(
    "Kurir Pulsa",
    TemplateCategory.SERVICES,
    kurirPulsaCover,
    "https://kurir-pulsa.wreative.com",
  ),
  portfolio(
    "LPK Furinkazan",
    TemplateCategory.EDUCATION,
    lpkFurinkazanCover,
    "https://lpk-furinkazan.wreative.com",
  ),
  portfolio(
    "CV. Panji Semesta",
    TemplateCategory.BUSINESS,
    panjiSemestaCover,
    "https://panji-semesta.wreative.com",
  ),
  portfolio(
    "Aviso",
    TemplateCategory.BUSINESS,
    avisoCover,
    "https://aviso.wreative.com",
  ),
  portfolio(
    "Dzata Lombok Transport",
    TemplateCategory.SERVICES,
    dzataLombokTransportCover,
    "https://dzatalomboktransport.com",
  ),
  portfolio(
    "Spesialis Karangan Bunga Indonesia",
    TemplateCategory.FLORIST,
    spesialisKaranganBungaIndonesiaCover,
    "https://spesialiskaranganbungaindonesia.com",
  ),
  portfolio(
    "BE MODE Indonesia",
    TemplateCategory.ECOMMERCE,
    bemodeCover,
    "https://bemodeofficial.com",
  ),
  portfolio(
    "SG Academy",
    TemplateCategory.EDUCATION,
    sgAcademyCover,
    "https://sgacademy.co.id/",
  ),
  portfolio(
    "Roby Saputra Grup",
    TemplateCategory.BUSINESS,
    robySaputraGrupCover,
    "https://robysaputragrup.com/",
  ),
];

// Any wreative.com URL, including subdomains, counts as primary.
const isPrimaryDomain = (url: string): boolean => url.includes(PRIMARY_DOMAIN);

// Stable sort: primary-domain entries move to the end, others keep their order.
const sortByPrimaryDomainLast = (entries: TemplateData[]): TemplateData[] =>
  [...entries].sort(
    (a, b) => Number(isPrimaryDomain(a.url)) - Number(isPrimaryDomain(b.url)),
  );

export const templates: TemplateData[] = sortByPrimaryDomainLast(
  rawTemplates.map((entry, index) => ({ id: index + 1, ...entry })),
);
