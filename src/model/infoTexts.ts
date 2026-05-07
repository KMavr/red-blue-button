import type React from 'react';
import Paragraph from '../components/Paragraph/Paragraph';
import Heading from '../components/Heading/Heading';
import ExternalLinks from '../components/ExternalLinks/ExternalLinks';
import NavLinks from '../components/NavLinks/NavLinks';
import ColoredList from '../components/ColoredList/ColoredList';
import PlainList from '../components/PlainList/PlainList';
import LabeledList from '../components/LabeledList/LabeledList';
import TransParagraph from '../components/TransParagraph/TransParagraph';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockOf<T extends React.ComponentType<any>> = {
  component: T;
  props: React.ComponentProps<T>;
};

export type Block =
  | BlockOf<typeof Paragraph>
  | BlockOf<typeof Heading>
  | BlockOf<typeof ColoredList>
  | BlockOf<typeof ExternalLinks>
  | BlockOf<typeof NavLinks>
  | BlockOf<typeof PlainList>
  | BlockOf<typeof LabeledList>
  | BlockOf<typeof TransParagraph>;

export const ABOUT_BLOCKS: Block[] = [
  { component: Paragraph, props: { text: 'about-page.intro' } },

  { component: Heading, props: { text: 'about-page.setup.h2' } },
  { component: Paragraph, props: { text: 'about-page.setup.body' } },
  {
    component: ColoredList,
    props: {
      items: [
        { key: 'about-page.setup.red-rule', color: 'red' },
        { key: 'about-page.setup.blue-rule', color: 'blue' },
      ],
    },
  },
  { component: Paragraph, props: { text: 'about-page.setup.conclusion' } },

  { component: Heading, props: { text: 'about-page.two-answers.h2' } },
  { component: Paragraph, props: { text: 'about-page.two-answers.body1' } },
  { component: Paragraph, props: { text: 'about-page.two-answers.body2' } },
  { component: Paragraph, props: { text: 'about-page.two-answers.body3' } },

  { component: Heading, props: { text: 'about-page.viral.h2' } },
  { component: Paragraph, props: { text: 'about-page.viral.body1' } },
  { component: Paragraph, props: { text: 'about-page.viral.body2' } },

  { component: Heading, props: { text: 'about-page.data.h2' } },
  { component: Paragraph, props: { text: 'about-page.data.body1' } },
  { component: Paragraph, props: { text: 'about-page.data.body2' } },

  {
    component: NavLinks,
    props: {
      links: [
        { to: '/why-blue', labelKey: 'about-page.why-blue-link', color: 'blue', suffix: ' →' },
        { to: '/why-red', labelKey: 'about-page.why-red-link', color: 'red', suffix: ' →' },
      ],
    },
  },

  { component: Heading, props: { text: 'about-page.reading.h2' } },
  {
    component: ExternalLinks,
    props: {
      items: [
        {
          href: 'https://www.goodthoughts.blog/p/buttons-blenders-and-coordination',
          labelKey: 'about-page.reading.link1-label',
        },
        {
          href: 'https://theconversation.com/red-button-or-blue-button-what-a-viral-question-tells-us-about-game-theory-and-the-state-of-the-world-281993',
          labelKey: 'about-page.reading.link2-label',
        },
      ],
    },
  },
];

const spreadNav = 'mt-10 justify-between';

export const WHY_RED_BLOCKS: Block[] = [
  { component: Paragraph, props: { text: 'why-red-page.intro' } },

  { component: Heading, props: { text: 'why-red-page.nash.h2' } },
  { component: Paragraph, props: { text: 'why-red-page.nash.body' } },

  { component: Heading, props: { text: 'why-red-page.uncertainty.h2' } },
  { component: Paragraph, props: { text: 'why-red-page.uncertainty.body1' } },
  { component: Paragraph, props: { text: 'why-red-page.uncertainty.body2' } },

  { component: Heading, props: { text: 'why-red-page.framing.h2' } },
  { component: Paragraph, props: { text: 'why-red-page.framing.body' } },

  { component: Heading, props: { text: 'why-red-page.villain.h2' } },
  { component: Paragraph, props: { text: 'why-red-page.villain.body1' } },
  { component: Paragraph, props: { text: 'why-red-page.villain.body2' } },

  { component: Heading, props: { text: 'why-red-page.distrust.h2' } },
  { component: Paragraph, props: { text: 'why-red-page.distrust.body' } },

  {
    component: NavLinks,
    props: {
      className: spreadNav,
      links: [
        { to: '/why-blue', labelKey: 'why-red-page.nav.blue', color: 'blue' },
        { to: '/about', labelKey: 'why-red-page.nav.about', color: 'muted' },
      ],
    },
  },
];

export const WHY_BLUE_BLOCKS: Block[] = [
  { component: Paragraph, props: { text: 'why-blue-page.intro' } },

  { component: Heading, props: { text: 'why-blue-page.self-fulfilling.h2' } },
  { component: Paragraph, props: { text: 'why-blue-page.self-fulfilling.body' } },

  { component: Heading, props: { text: 'why-blue-page.collective.h2' } },
  { component: Paragraph, props: { text: 'why-blue-page.collective.body' } },

  { component: Heading, props: { text: 'why-blue-page.red-unsafe.h2' } },
  { component: Paragraph, props: { text: 'why-blue-page.red-unsafe.body' } },

  { component: Heading, props: { text: 'why-blue-page.majority.h2' } },
  { component: Paragraph, props: { text: 'why-blue-page.majority.body1' } },
  { component: Paragraph, props: { text: 'why-blue-page.majority.body2' } },

  { component: Heading, props: { text: 'why-blue-page.schelling.h2' } },
  { component: Paragraph, props: { text: 'why-blue-page.schelling.body' } },

  {
    component: NavLinks,
    props: {
      className: spreadNav,
      links: [
        { to: '/about', labelKey: 'why-blue-page.nav.about', color: 'muted' },
        { to: '/why-red', labelKey: 'why-blue-page.nav.red', color: 'red' },
      ],
    },
  },
];

export const PRIVACY_BLOCKS: Block[] = [
  { component: Paragraph, props: { text: 'privacy-page.intro' } },

  { component: Heading, props: { text: 'privacy-page.collect.h2' } },
  { component: Paragraph, props: { text: 'privacy-page.collect.intro' } },
  {
    component: PlainList,
    props: {
      items: [
        'privacy-page.collect.item1',
        'privacy-page.collect.item2',
        'privacy-page.collect.item3',
      ],
    },
  },

  { component: Heading, props: { text: 'privacy-page.cookies.h2' } },
  { component: Paragraph, props: { text: 'privacy-page.cookies.intro' } },
  {
    component: LabeledList,
    props: {
      items: [
        {
          labelKey: 'privacy-page.cookies.voted-label',
          textKey: 'privacy-page.cookies.voted-text',
        },
        {
          labelKey: 'privacy-page.cookies.choice-label',
          textKey: 'privacy-page.cookies.choice-text',
        },
      ],
    },
  },
  { component: Paragraph, props: { text: 'privacy-page.cookies.outro' } },

  { component: Heading, props: { text: 'privacy-page.adsense.h2' } },
  {
    component: TransParagraph,
    props: {
      i18nKey: 'privacy-page.adsense.body',
      links: [
        { name: 'googlePrivacy', href: 'https://policies.google.com/privacy' },
        { name: 'adSettings', href: 'https://adssettings.google.com' },
      ],
    },
  },

  { component: Heading, props: { text: 'privacy-page.sharing.h2' } },
  { component: Paragraph, props: { text: 'privacy-page.sharing.body' } },

  { component: Heading, props: { text: 'privacy-page.retention.h2' } },
  { component: Paragraph, props: { text: 'privacy-page.retention.body' } },

  { component: Heading, props: { text: 'privacy-page.contact.h2' } },
  {
    component: TransParagraph,
    props: {
      i18nKey: 'privacy-page.contact.body',
      links: [{ name: 'email', href: 'mailto:privacy@redor.blue', email: true }],
    },
  },
];
