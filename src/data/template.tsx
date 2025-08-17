import fajarFloristCover from '../../assets/cover/fajar-florist.webp';
import waseBumiIndonesiaCover from '../../assets/cover/wase-bumi-indonesia.webp';
import firstMediaSurabayaCover from '../../assets/cover/first-media-surabaya.webp';
import kontraktorSurabayaCover from '../../assets/cover/kontraktor-surabaya.webp';
import wreativeCover from '../../assets/cover/wreative.webp';
import wreativeStoreCover from '../../assets/cover/wreative-store.webp';
import cubicleToiletCover from '../../assets/cover/cubicle-toilet.webp';
import DPUBinaMargaMusiCover from '../../assets/cover/dpu-bina-marga-musi.webp';
import adiKaryaPesonaCover from '../../assets/cover/adikarya-pesona.webp';
import homeBarakaCover from '../../assets/cover/home-baraka.webp';
import chickenExplorerCover from '../../assets/cover/chicken-explorer.webp';
import kurirPulsaCover from '../../assets/cover/kurir-pulsa.webp';
import panjiSemestaCover from '../../assets/cover/panji-semesta.webp';
import dzataLombokTransportCover from '../../assets/cover/dzata-lombok-transport.webp';
import pernikahanIni from '../../assets/cover/pernikahan-ini.webp';
import posSatpam from '../../assets/cover/pos-satpam.webp';
import toiletPortabel from '../../assets/cover/toilet-portabel.webp';
import ptModernCocoInternational from '../../assets/cover/pt-modern-coco-international.webp';
import spesialisKaranganBungaIndonesia from '../../assets/cover/spesialis-karangan-bunga.webp';

export interface TemplateData {
    id: number;
    title: string;
    category: string;
    image: string;
    url: string;
}

const sortTemplates = (templates: TemplateData[]): TemplateData[] => {
    return templates.sort((a, b) => {
        const firstItemURL = a.url.includes('wreative.com');
        const secondItemURL = b.url.includes('wreative.com');
        if (firstItemURL && !secondItemURL) return 1;
        if (!firstItemURL && secondItemURL) return -1;
        return 0;
    });
};

export const templates: TemplateData[] = sortTemplates([
    {
        id: 1,
        title: "Kontraktor Surabaya",
        category: "Services",
        image: kontraktorSurabayaCover,
        url: "https://kontraktorsurabaya.wreative.com/"
    },
    {
        id: 2,
        title: "Wase Bumi Indonesia",
        category: "Business",
        image: waseBumiIndonesiaCover,
        url: "https://wasebumiindonesia.wreative.com/"
    },
    {
        id: 3,
        title: "Cubicle Toilet",
        category: "Services",
        image: cubicleToiletCover,
        url: "https://cubicletoiletid.com/"
    },
    {
        id: 4,
        title: "PT. Adikarya Pesona Intinusa",
        category: "Education",
        image: adiKaryaPesonaCover,
        url: "https://adikaryapesona.wreative.com/"
    },
    {
        id: 5,
        title: "Wreative Store",
        category: "E-Commerce",
        image: wreativeStoreCover,
        url: "https://store.wreative.com"
    },
    {
        id: 6,
        title: "Home Baraka",
        category: "Services",
        image: homeBarakaCover,
        url: "https://homebaraka.wreative.com/"
    },
    {
        id: 7,
        title: "Wreative",
        category: "Business",
        image: wreativeCover,
        url: "https://wreative.com/"
    },
    {
        id: 8,
        title: "Fajar Florist",
        category: "Florist & Gardening",
        image: fajarFloristCover,
        url: "https://fajarflorist.wreative.com/"
    },
    {
        id: 9,
        title: "DPU Bina Marga Kabupaten Musi",
        category: "Government",
        image: DPUBinaMargaMusiCover,
        url: "https://pamusiwaras.wreative.com/"
    },
    {
        id: 10,
        title: "First Media Surabaya",
        category: "Business",
        image: firstMediaSurabayaCover,
        url: "https://firstmediasurabaya.wreative.com/"
    },
    {
        id: 11,
        title: "Wahyu Dewanagari",
        category: "Business",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
        url: "https://wreative.com"
    },
    {
        id: 12,
        title: "Toilet Portable",
        category: "Services",
        image: toiletPortabel,
        url: "https://toilet-portabel.wreative.com"
    },
    {
        id: 13,
        title: "Sakpattana Jawa Timur",
        category: "Business",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
        url: "https://wreative.com"
    },
    {
        id: 14,
        title: "Pos Satpam Surabaya",
        category: "Services",
        image: posSatpam,
        url: "https://pos-satpam.wreative.com"
    },
    {
        id: 15,
        title: "PT. Modern Coco International",
        category: "Business",
        image: ptModernCocoInternational,
        url: "https://pt-modern-coco-international.wreative.com/"
    },
    {
        id: 16,
        title: "CV Putra Kubota",
        category: "Business",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
        url: "https://cv-putra-kubota.wreative.com"
    },
    {
        id: 17,
        title: "Pernikahan Ini",
        category: "Services",
        image: pernikahanIni,
        url: "https://pernikahanini.com"
    },
    {
        id: 18,
        title: "Chicken Explorer",
        category: "Business",
        image: chickenExplorerCover,
        url: "https://chickenexplorer.com"
    },
    {
        id: 19,
        title: "Kurir Pulsa",
        category: "Services",
        image: kurirPulsaCover,
        url: "https://kurirpulsa.wreative.com"
    },
    {
        id: 20,
        title: "LPK Furinkazan",
        category: "Education",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
        url: "https://wreative.com"
    },
    {
        id: 21,
        title: "CV. Panji Semesta",
        category: "Business",
        image: panjiSemestaCover,
        url: "https://panji-semesta.wreative.com"
    },
    {
        id: 22,
        title: "Aviso",
        category: "Services",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
        url: "https://wreative.com"
    },
    {
        id: 23,
        title: "Dzata Lombok Transport",
        category: "Services",
        image: dzataLombokTransportCover,
        url: "https://dzatalomboktransport.com/"
    },
    {
        id: 24,
        title: "Spesialis Karangan Bunga Indonesia",
        category: "Florist & Gardening",
        image: spesialisKaranganBungaIndonesia,
        url: "https://spesialiskaranganbungaindonesia.com/"
    },
]);