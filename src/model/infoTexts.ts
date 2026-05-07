import type React from 'react';
import Paragraph from '../components/Paragraph/Paragraph';
import Heading from '../components/Heading/Heading';
import ExternalLinks from '../components/ExternalLinks/ExternalLinks';
import NavLinks from '../components/NavLinks/NavLinks';
import ColoredList from '../components/ColoredList/ColoredList';

type BlockOf<T extends React.ComponentType<any>> = {
  component: T;
  props: React.ComponentProps<T>;
};

export type Block =
  | BlockOf<typeof Paragraph>
  | BlockOf<typeof Heading>
  | BlockOf<typeof ColoredList>
  | BlockOf<typeof ExternalLinks>
  | BlockOf<typeof NavLinks>;

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
