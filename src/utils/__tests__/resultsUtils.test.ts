import { deriveSurvived } from '../resultsUtils';

describe('deriveSurvived', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('null return conditions', () => {
    it('should return null when majority is null', () => {
      expect(deriveSurvived(null, 'red')).toBeNull();
    });

    it('should return null when choice is undefined', () => {
      expect(deriveSurvived('blue', undefined)).toBeNull();
    });

    it('should return null when majority is null and choice is undefined', () => {
      expect(deriveSurvived(null, undefined)).toBeNull();
    });
  });

  describe('blue majority', () => {
    it('should return true when majority is blue and choice is blue', () => {
      expect(deriveSurvived('blue', 'blue')).toBe(true);
    });

    it('should return true when majority is blue and choice is red', () => {
      expect(deriveSurvived('blue', 'red')).toBe(true);
    });
  });

  describe('red majority', () => {
    it('should return true when majority is red and choice is red', () => {
      expect(deriveSurvived('red', 'red')).toBe(true);
    });

    it('should return false when majority is red and choice is blue', () => {
      expect(deriveSurvived('red', 'blue')).toBe(false);
    });
  });
});
