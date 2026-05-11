import { countryFlag, countryName } from '../countryUtils';

describe('countryUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('countryFlag', () => {
    it('should return the globe emoji for code XX', () => {
      expect(countryFlag('XX')).toBe('🌐');
    });

    it('should return the globe emoji for codes longer than 2 characters', () => {
      expect(countryFlag('USA')).toBe('🌐');
    });

    it('should return the globe emoji for codes shorter than 2 characters', () => {
      expect(countryFlag('U')).toBe('🌐');
    });

    it('should return the globe emoji for an empty string', () => {
      expect(countryFlag('')).toBe('🌐');
    });

    it('should return the correct flag emoji for US', () => {
      expect(countryFlag('US')).toBe('🇺🇸');
    });

    it('should return the correct flag emoji for GB', () => {
      expect(countryFlag('GB')).toBe('🇬🇧');
    });

    it('should return the correct flag emoji for DE', () => {
      expect(countryFlag('DE')).toBe('🇩🇪');
    });

    it('should handle lowercase codes by uppercasing them', () => {
      expect(countryFlag('us')).toBe('🇺🇸');
    });
  });

  describe('countryName', () => {
    it('should return the unknownLabel for code XX', () => {
      expect(countryName('XX', 'en', 'Unknown')).toBe('Unknown');
    });

    it('should return "Unknown" as the default label for code XX when not specified', () => {
      expect(countryName('XX', 'en')).toBe('Unknown');
    });

    it('should return a custom unknown label for code XX', () => {
      expect(countryName('XX', 'en', 'Other')).toBe('Other');
    });

    it('should return the display name for US in English', () => {
      expect(countryName('US', 'en')).toBe('United States');
    });

    it('should return the display name for DE in English', () => {
      expect(countryName('DE', 'en')).toBe('Germany');
    });

    it('should return the display name for FR in English', () => {
      expect(countryName('FR', 'en')).toBe('France');
    });

    it('should return the Intl display name for an unrecognised but valid-length code', () => {
      // Intl.DisplayNames returns 'Unknown Region' for unrecognised 2-letter codes rather than
      // undefined, so the ?? code fallback is not reached in practice
      expect(countryName('ZZ', 'en')).toBe('Unknown Region');
    });
  });
});
