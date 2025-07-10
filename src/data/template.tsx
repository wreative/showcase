import fajarFloristCover from '../../assets/cover/fajar-florist.webp';
import waseBumiIndonesiaCover from '../../assets/cover/wase-bumi-indonesia.webp';
import firstMediaSurabayaCover from '../../assets/cover/first-media-surabaya.webp';

export interface TemplateData {
    id: number;
    title: string;
    category: string;
    image: string;
    url: string;
}

export const templates: TemplateData[] = [
    {
        id: 1,
        title: "Kontraktor Surabaya",
        category: "Services",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
        url: "http://konstraktorsurabaya.com/"
    },
    {
        id: 2,
        title: "Wase Bumi Indonesia",
        category: "Business",
        image: waseBumiIndonesiaCover,
        url: "https://wasebumiindonesia.com/"
    },
    {
        id: 3,
        title: "Cubicle Toilet",
        category: "Services",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop",
        url: "https://cubicletoiletid.com/"
    },
    {
        id: 4,
        title: "PT. Adikarya Pesona",
        category: "Education",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
        url: "https://adikaryapesona.wreative.com/"
    },
    {
        id: 5,
        title: "Wreative Store",
        category: "E-Commerce",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
        url: "https://store.wreative.com"
    },
    {
        id: 6,
        title: "Home Baraka",
        category: "Services",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
        url: "https://homebaraka.wreative.com/"
    },
    {
        id: 7,
        title: "Wreative",
        category: "Business",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2000&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
        url: "https://pamusiwaras.wreative.com/"
    },
    {
        id: 10,
        title: "First Media Surabaya",
        category: "Business",
        image: firstMediaSurabayaCover,
        url: "https://firstmediasurabaya.wreative.com/"
    },
];