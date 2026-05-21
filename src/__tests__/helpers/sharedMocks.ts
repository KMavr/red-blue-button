vi.mock('framer-motion', async () => {
  const React = await import('react');
  const MOTION_PROPS = new Set([
    'whileHover',
    'whileTap',
    'whileFocus',
    'whileDrag',
    'whileInView',
    'animate',
    'initial',
    'exit',
    'transition',
    'variants',
    'layout',
    'layoutId',
    'drag',
    'dragConstraints',
  ]);
  return {
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_target, tag: string) =>
        function MotionComponent(props: Record<string, unknown>) {
          const filtered = Object.fromEntries(
            Object.entries(props).filter(([k]) => !MOTION_PROPS.has(k)),
          );
          return React.createElement(tag, filtered);
        },
    }),
    AnimatePresence: ({ children }: { children: unknown }) => children,
    useReducedMotion: () => false,
    animate: () => ({ stop: () => {} }),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
  I18nextProvider: ({ children }: { children: unknown }) => children,
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

export const mockCookiesGet = vi.fn();
export const mockCookiesSet = vi.fn();
export const mockCookiesRemove = vi.fn();

vi.mock('js-cookie', () => ({
  default: {
    get: mockCookiesGet,
    set: mockCookiesSet,
    remove: mockCookiesRemove,
  },
}));
