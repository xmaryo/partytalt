import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Om oss',
      href: getPermalink('/om-oss'),
    },
    {
      text: 'Vanliga frågor',
      href: getPermalink('/vanliga-fragor'),
    },
    {
      text: 'Kontakt',
      href: getPermalink('/kontakt'),
    },
  ],
  actions: [{ text: 'Boka nu', href: getPermalink('/kontakt'), variant: 'primary' }],
};

export const footerData = {
  links: [
    {
      title: 'Information',
      links: [
        { text: 'Produkter', href: '/#produkter' },
        { text: 'Vanliga frågor', href: getPermalink('/vanliga-fragor') },
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
  ],
  secondaryLinks: [
    { text: 'Villkor', href: getPermalink('/villkor') },
    { text: 'Integritetspolicy', href: getPermalink('/integritetspolicy') },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'mdi:facebook', href: 'https://www.facebook.com/share/1ASDkHWBNC/' },
    { ariaLabel: 'Instagram', icon: 'mdi:instagram', href: '#' },
  ],
  footNote: `© ${new Date().getFullYear()} PartyTent Helsingborg. Alla rättigheter förbehållna.`,
};
