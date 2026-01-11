import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Produkter',
      href: '/#produkter',
    },
    {
      text: 'Om oss',
      href: getPermalink('/om-oss'),
    },
    {
      text: 'FAQ',
      href: getPermalink('/faq'),
    },
    {
      text: 'Kontakt',
      href: getPermalink('/kontakt'),
    },
  ],
  actions: [{ text: 'Få offert', href: getPermalink('/kontakt'), variant: 'primary' }],
};

export const footerData = {
  links: [
    {
      title: 'Information',
      links: [
        { text: 'Produkter', href: '/#produkter' },
        { text: 'FAQ', href: getPermalink('/faq') },
        { text: 'Galleri', href: getPermalink('/galleri') },
      ],
    },
    {
      title: 'Företaget',
      links: [
        { text: 'Om oss', href: getPermalink('/om-oss') },
        { text: 'Kontakt', href: getPermalink('/kontakt') },
      ],
    },
    {
      title: 'Områden',
      links: [
        { text: 'Helsingborg', href: '#' },
        { text: 'Landskrona', href: '#' },
        { text: 'Ängelholm', href: '#' },
        { text: 'Höganäs', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Villkor', href: getPermalink('/villkor') },
    { text: 'Integritetspolicy', href: getPermalink('/integritetspolicy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'mdi:instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'mdi:facebook', href: '#' },
  ],
  footNote: `
    © ${new Date().getFullYear()} PartyTent Helsingborg. Alla rättigheter förbehållna.
  `,
};
