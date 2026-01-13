// Product images
import partytaltLargeImg from '~/assets/images/products/partytalt-large.webp';
import partytaltSmallImg from '~/assets/images/products/partytalt-small.webp';
import partytaltVariant1Img from '~/assets/images/products/partytalt-variant1.webp';
import partytalt6x6Img from '~/assets/images/products/partytalt-6x6.jpeg';
import partytalt5x10Img from '~/assets/images/products/partytalt-5x10.jpeg';
import partytalt4x8Img from '~/assets/images/products/partytalt-4x8.jpeg';
import bordRuntImg from '~/assets/images/products/bord-runt-new.jpg';
import bordRektangulartImg from '~/assets/images/products/bord-rektangulart.webp';
import cocktailbordImg from '~/assets/images/products/cocktailbord.webp';
import stolSvartImg from '~/assets/images/products/stol-svart.webp';
import stolGraImg from '~/assets/images/products/stol-gra.webp';
import festbelysningImg from '~/assets/images/products/festbelysning.webp';
import kylskapImg from '~/assets/images/products/kylskap.webp';
import eventgolvImg from '~/assets/images/products/eventgolv.webp';

// Existing images (keep for flextält)

// 3D Icons for category selector
import taltIcon from '~/assets/images/icons/talt-icon.png';
import bordIcon from '~/assets/images/icons/bord-icon.png';
import stolarIcon from '~/assets/images/icons/stolar-icon.png';
import kylskapIcon from '~/assets/images/icons/kylskap-icon.png';

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
  iconImage: ImageMetadata; // 3D icon for category selector
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
    iconImage: taltIcon,
    fullDescription:
      'Oavsett om det är student, födelsedag, bröllop eller sommarfest har vi rätt tält för dig. Våra partytält är eleganta, vädertåliga och rymmer allt från 20 till 100 gäster.',
    features: ['Vattentät PVC-duk', 'Galvaniserad stålram', 'Eleganta fönster', 'Modulär design'],
    variants: [
      {
        name: 'Partytält 4x4m',
        description: 'Passar för ca 20-30 gäster. Perfekt för mindre fester och familjetillställningar.',
        image: partytaltSmallImg,
        price: 'från 2 750 kr/dag',
        specs: {
          Storlek: '4 x 4 meter',
          Kapacitet: '20-30 gäster',
          Material: 'PVC-duk, galvaniserad stålram',
          Fönster: 'Georgisk stil',
        },
      },
      {
        name: 'Partytält 5x5m',
        description: 'Passar för ca 30-50 gäster. Populärt val för familjefester och mindre bröllop.',
        image: partytaltVariant1Img,
        price: 'från 3 250 kr/dag',
        specs: {
          Storlek: '5 x 5 meter',
          Kapacitet: '30-50 gäster',
          Material: 'PVC-duk, galvaniserad stålram',
          Fönster: 'Georgisk stil',
        },
      },
      {
        name: 'Partytält 4x8m',
        description: 'Klassiskt tält med vattentät PVC-duk och galvaniserad stålram. Avtagbara väggar för flexibel konfiguration. Georgiska fönster ger fint ljusinsläpp.',
        image: partytalt4x8Img,
        price: 'från 4 250 kr/dag',
        specs: {
          Storlek: '4 x 8 meter',
          Kapacitet: '32-42 gäster',
          Material: 'PVC 500g/m², galvaniserad stålram',
          Fönster: 'Georgisk stil',
        },
      },
      {
        name: 'Partytält 6x6m',
        description: 'Elegant tält med vattentät PVC-duk och galvaniserad stålram. Georgiska fönster ger fint ljusinsläpp. Perfekt för medelstora fester och bröllop.',
        image: partytalt6x6Img,
        price: 'från 4 000 kr/dag',
        specs: {
          Storlek: '6 x 6 meter',
          Kapacitet: '30-36 gäster',
          Material: 'PVC 500g/m², galvaniserad stålram',
          Fönster: 'Georgisk stil',
        },
      },
      {
        name: 'Partytält 5x10m',
        description: 'Rymligt tält med vattentät PVC-duk och robust stålram. Stora georgiska fönster ger härligt ljusinsläpp. Perfekt för större fester och bröllop.',
        image: partytalt5x10Img,
        price: 'från 5 750 kr/dag',
        specs: {
          Storlek: '5 x 10 meter',
          Kapacitet: '50-67 gäster',
          Material: 'PVC 500g/m², galvaniserad stålram',
          Fönster: 'Georgisk stil',
        },
      },
      {
        name: 'Partytält 6x12m',
        description: 'Passar för ca 60-100 gäster. Perfekt för bröllop och större företagsevent.',
        image: partytaltLargeImg,
        price: 'från 6 750 kr/dag',
        specs: {
          Storlek: '6 x 12 meter',
          Kapacitet: '60-100 gäster',
          Material: 'PVC-duk, galvaniserad stålram',
          Fönster: 'Georgisk stil',
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
    iconImage: bordIcon,
    fullDescription:
      'Stabila fällbord i flera storlekar – perfekta för middagar, bufféer och mingel. Lätta att ställa upp och ta ner, med bordsskiva i högdensitetspolyeten och kraftig stålram.',
    features: ['Lätta att fälla', 'HDPE bordsskiva', 'Stålram', 'Flera storlekar'],
    variants: [
      {
        name: 'Fällbord 180 cm',
        description: 'Standardbord som passar 6-8 personer. Perfekt för middagar och bufféer.',
        image: bordRektangulartImg,
        price: '100 kr/dag',
        specs: {
          Längd: '180 cm',
          Bredd: '76 cm',
          Höjd: '74 cm',
          Material: 'HDPE bordsskiva, pulverlackerad stålram',
          Kapacitet: '6-8 personer',
        },
      },
      {
        name: 'Runt fällbord',
        description: 'Runda bord som passar 8-10 personer. Perfekt för bröllop och eleganta tillställningar.',
        image: bordRuntImg,
        price: '125 kr/dag',
        specs: {
          Diameter: '152 cm',
          Höjd: '74 cm',
          Material: 'HDPE bordsskiva, pulverlackerad stålram',
          Kapacitet: '8-10 personer',
        },
      },
      {
        name: 'Cocktailbord',
        description: 'Ståbord för mingel och cocktailpartyn. Högt och elegant för stående gäster.',
        image: cocktailbordImg,
        price: '200 kr/dag',
        specs: {
          Diameter: '80 cm',
          Höjd: '110 cm',
          Material: 'HDPE bordsskiva, stålram',
          Användning: 'Mingel, cocktailpartyn',
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
    iconImage: stolarIcon,
    fullDescription:
      'Eleganta fällstolar som passar perfekt för bröllop, fester och andra event. Bekväma, lätta att hantera och stapelbara för enkel transport.',
    features: ['Stapelbara', 'Pulverlackerad stålram', 'Lätta', 'Bekväma'],
    variants: [
      {
        name: 'Svart fällstol',
        description: 'Klassisk svart fällstol. Stilren och passar de flesta tillställningar.',
        image: stolSvartImg,
        price: '25 kr/dag',
        specs: {
          Mått: '48 x 43 x 89 cm (B x D x H)',
          Vikt: '3 kg',
          Material: 'Pulverlackerad stålram',
          Sitshöjd: '45 cm',
        },
      },
      {
        name: 'Grå fällstol (stoppad)',
        description: 'Bekväm fällstol med stoppad sits och rygg. Extra komfort för längre tillställningar.',
        image: stolGraImg,
        price: '35 kr/dag',
        specs: {
          Mått: '48 x 43 x 89 cm (B x D x H)',
          Vikt: '3.5 kg',
          Material: 'Pulverlackerad stålram, stoppning',
          Sitshöjd: '45 cm',
        },
      },
    ],
  },
  {
    id: 'tillbehor',
    title: 'Tillbehör',
    shortDesc: 'Belysning, kyl & mer',
    icon: 'mdi:lightbulb-outline',
    mainImage: festbelysningImg,
    iconImage: kylskapIcon,
    fullDescription:
      'Komplettera din fest med belysning, kyl och golv. Vi har allt du behöver för att skapa den perfekta stämningen på ditt event.',
    features: ['Ljusslinga', 'Kylskåp', 'Eventgolv'],
    variants: [
      {
        name: 'Ljusslinga',
        description: 'Kort ljusslinga med stämningsfulla lampfattningar. Skapar en magisk atmosfär i tältet.',
        image: festbelysningImg,
        price: '350 kr/dag',
        specs: {
          Typ: 'Ljusslinga med E27-sockel',
          Längd: '6 meter',
          Lamptyp: 'LED-lampor (ingår ej)',
          Användning: 'Tält, utomhus, trädgård',
        },
      },
      {
        name: 'Ljusslinga',
        description: 'Medium ljusslinga med stämningsfulla lampfattningar. Skapar en magisk atmosfär i tältet.',
        image: festbelysningImg,
        price: '400 kr/dag',
        specs: {
          Typ: 'Ljusslinga med E27-sockel',
          Längd: '8 meter',
          Lamptyp: 'LED-lampor (ingår ej)',
          Användning: 'Tält, utomhus, trädgård',
        },
      },
      {
        name: 'Ljusslinga',
        description: 'Lång ljusslinga med stämningsfulla lampfattningar. Skapar en magisk atmosfär i tältet.',
        image: festbelysningImg,
        price: '450 kr/dag',
        specs: {
          Typ: 'Ljusslinga med E27-sockel',
          Längd: '10 meter',
          Lamptyp: 'LED-lampor (ingår ej)',
          Användning: 'Tält, utomhus, trädgård',
        },
      },
      {
        name: 'Kylskåp',
        description: 'Professionellt kylskåp med glasdörr för drycker. Perfekt för att hålla dryckerna kalla.',
        image: kylskapImg,
        price: '1 200 kr/dag',
        specs: {
          Typ: 'Displaykyl med glasdörr',
          Volym: 'Ca 350 liter',
          Temperatur: '+2°C till +10°C',
          El: '230V',
        },
      },
      {
        name: 'Eventgolv',
        description: 'Sammankopplingsbart golvplattor för att skapa ett stabilt underlag i tältet.',
        image: eventgolvImg,
        price: '100 kr/m²/dag',
        specs: {
          'Storlek per platta': '40 x 40 cm',
          Material: 'Slitstark plast',
          Användning: 'Tält, gräsmatta, ojämnt underlag',
          Koppling: 'Klicksystem',
        },
      },
    ],
  },
];
