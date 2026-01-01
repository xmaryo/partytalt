// Product images
import partytaltLargeImg from '~/assets/images/products/partytalt-large.webp';
import partytaltSmallImg from '~/assets/images/products/partytalt-small.webp';
import partytaltVariant1Img from '~/assets/images/products/partytalt-variant1.webp';
import bordRuntImg from '~/assets/images/products/bord-runt.webp';
import bordRektangulartImg from '~/assets/images/products/bord-rektangulart.webp';
import cocktailbordImg from '~/assets/images/products/cocktailbord.webp';
import stolSvartImg from '~/assets/images/products/stol-svart.webp';
import stolGraImg from '~/assets/images/products/stol-gra.webp';
import stoloverdragImg from '~/assets/images/products/stoloverdrag.webp';

// Existing images (keep for flextält)
import flextaltImg from '~/assets/images/flextalt.webp';

export interface ProductVariant {
  name: string;
  description: string;
  image: ImageMetadata;
  price?: string; // e.g. "från 500 kr/dag"
  specs?: Record<string, string>;
}

export interface ProductCategory {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  mainImage: ImageMetadata;
  fullDescription: string;
  features: string[];
  variants: ProductVariant[];
}

export const categories: ProductCategory[] = [
  {
    id: 'partytalt',
    title: 'Partytält',
    shortDesc: 'Tält för alla event',
    icon: 'mdi:warehouse',
    mainImage: partytaltLargeImg,
    fullDescription: 'Oavsett om det är student, födelsedag, bröllop eller sommarfest har vi rätt tält för dig. Våra partytält är eleganta, vädertåliga och rymmer allt från 20 till 100 gäster.',
    features: ['Vattentät PVC-duk', 'Galvaniserad stålram', 'Eleganta fönster', 'Modulär design'],
    variants: [
      {
        name: 'Partytält 4x6m',
        description: 'Passar för ca 20-30 gäster. Perfekt för mindre fester och familjetillställningar.',
        image: partytaltSmallImg,
        price: 'från 1 500 kr/dag',
        specs: {
          'Storlek': '4 x 6 meter',
          'Kapacitet': '20-30 gäster',
          'Material': 'PVC-duk, galvaniserad stålram',
          'Fönster': 'Georgisk stil',
        },
      },
      {
        name: 'Partytält 4x8m',
        description: 'Passar för ca 30-50 gäster. Populärt val för familjefester och mindre bröllop.',
        image: partytaltVariant1Img,
        price: 'från 2 500 kr/dag',
        specs: {
          'Storlek': '4 x 8 meter',
          'Kapacitet': '30-50 gäster',
          'Material': 'PVC-duk, galvaniserad stålram',
          'Fönster': 'Georgisk stil',
        },
      },
      {
        name: 'Partytält 6x12m',
        description: 'Passar för ca 60-100 gäster. Perfekt för bröllop och större företagsevent.',
        image: partytaltLargeImg,
        price: 'från 4 500 kr/dag',
        specs: {
          'Storlek': '6 x 12 meter',
          'Kapacitet': '60-100 gäster',
          'Material': 'PVC-duk, galvaniserad stålram',
          'Fönster': 'Georgisk stil',
        },
      },
      {
        name: 'Flextält (Popup)',
        description: 'Praktiska popup-tält som är perfekta för marknader, utställningar och mindre evenemang. Snabb montering på bara några minuter.',
        image: flextaltImg,
        price: 'från 500 kr/dag',
        specs: {
          'Storlekar': '3x3m, 3x4.5m, 3x6m',
          'Montering': '60 sekunder',
          'Material': 'Robust duk, aluminiumram',
          'Användning': 'Marknader, utställningar',
        },
      },
    ],
  },
  {
    id: 'bord',
    title: 'Bord',
    shortDesc: 'Fällbord & cocktailbord',
    icon: 'mdi:table-furniture',
    mainImage: bordRektangulartImg,
    fullDescription: 'Stabila fällbord i flera storlekar – perfekta för middagar, bufféer och mingel. Lätta att ställa upp och ta ner, med bordsskiva i högdensitetspolyeten och kraftig stålram.',
    features: ['Lätta att fälla', 'HDPE bordsskiva', 'Stålram', 'Flera storlekar'],
    variants: [
      {
        name: 'Fällbord 180 cm',
        description: 'Standardbord som passar 6-8 personer. Perfekt för middagar och bufféer.',
        image: bordRektangulartImg,
        price: '75 kr/dag',
        specs: {
          'Längd': '180 cm',
          'Bredd': '76 cm',
          'Höjd': '74 cm',
          'Material': 'HDPE bordsskiva, pulverlackerad stålram',
          'Kapacitet': '6-8 personer',
        },
      },
      {
        name: 'Fällbord 240 cm',
        description: 'Längre bord som passar 8-10 personer. Bra för större sällskap.',
        image: bordRektangulartImg,
        price: '100 kr/dag',
        specs: {
          'Längd': '240 cm',
          'Bredd': '76 cm',
          'Höjd': '74 cm',
          'Material': 'HDPE bordsskiva, pulverlackerad stålram',
          'Kapacitet': '8-10 personer',
        },
      },
      {
        name: 'Runt fällbord',
        description: 'Runda bord som passar 8-10 personer. Perfekt för bröllop och eleganta tillställningar.',
        image: bordRuntImg,
        price: '125 kr/dag',
        specs: {
          'Diameter': '152 cm',
          'Höjd': '74 cm',
          'Material': 'HDPE bordsskiva, pulverlackerad stålram',
          'Kapacitet': '8-10 personer',
        },
      },
      {
        name: 'Cocktailbord',
        description: 'Ståbord för mingel och cocktailpartyn. Högt och elegant för stående gäster.',
        image: cocktailbordImg,
        price: '100 kr/dag',
        specs: {
          'Diameter': '80 cm',
          'Höjd': '110 cm',
          'Material': 'HDPE bordsskiva, stålram',
          'Användning': 'Mingel, cocktailpartyn',
        },
      },
    ],
  },
  {
    id: 'stolar',
    title: 'Stolar',
    shortDesc: 'Fällstolar & tillbehör',
    icon: 'mdi:chair-rolling',
    mainImage: stolSvartImg,
    fullDescription: 'Eleganta fällstolar som passar perfekt för bröllop, fester och andra event. Bekväma, lätta att hantera och stapelbara för enkel transport.',
    features: ['Stapelbara', 'Pulverlackerad stålram', 'Lätta', 'Bekväma'],
    variants: [
      {
        name: 'Svart fällstol',
        description: 'Klassisk svart fällstol. Stilren och passar de flesta tillställningar.',
        image: stolSvartImg,
        price: '25 kr/dag',
        specs: {
          'Mått': '48 x 43 x 89 cm (B x D x H)',
          'Vikt': '3 kg',
          'Material': 'Pulverlackerad stålram',
          'Sitshöjd': '45 cm',
        },
      },
      {
        name: 'Grå fällstol (stoppad)',
        description: 'Bekväm fällstol med stoppad sits och rygg. Extra komfort för längre tillställningar.',
        image: stolGraImg,
        price: '35 kr/dag',
        specs: {
          'Mått': '48 x 43 x 89 cm (B x D x H)',
          'Vikt': '3.5 kg',
          'Material': 'Pulverlackerad stålram, stoppning',
          'Sitshöjd': '45 cm',
        },
      },
      {
        name: 'Stolsöverdrag',
        description: 'Eleganta stolsöverdrag med dekorativ rosett. Perfekt för bröllop och finare tillställningar.',
        image: stoloverdragImg,
        price: '20 kr/dag',
        specs: {
          'Material': 'Polyester/elastan',
          'Färg': 'Vit med rosett',
          'Användning': 'Bröllop, fester',
          'Tvättbar': 'Ja',
        },
      },
    ],
  },
];
