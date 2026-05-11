vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
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
