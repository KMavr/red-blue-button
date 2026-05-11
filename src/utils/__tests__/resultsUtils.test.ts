import { deriveSurvived } from '../resultsUtils';

describe('deriveSurvived', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('stateValue short-circuit', () => {
    it('should return true when stateValue is true, regardless of majority or choice', () => {
      expect(deriveSurvived(true, 'red', 'blue')).toBe(true);
    });

    it('should return false when stateValue is false, regardless of majority or choice', () => {
      expect(deriveSurvived(false, 'blue', 'red')).toBe(false);
    });

    it('should return true when stateValue is true and majority is null', () => {
      expect(deriveSurvived(true, null, undefined)).toBe(true);
    });

    it('should return false when stateValue is false and majority is null', () => {
      expect(deriveSurvived(false, null, undefined)).toBe(false);
    });
  });

  describe('null return conditions', () => {
    it('should return null when stateValue is undefined and majority is null', () => {
      expect(deriveSurvived(undefined, null, 'red')).toBeNull();
    });

    it('should return null when stateValue is undefined and choice is undefined', () => {
      expect(deriveSurvived(undefined, 'blue', undefined)).toBeNull();
    });

    it('should return null when stateValue, majority, and choice are all undefined/null', () => {
      expect(deriveSurvived(undefined, null, undefined)).toBeNull();
    });
  });

  describe('blue majority', () => {
    it('should return true when majority is blue and choice is blue', () => {
      expect(deriveSurvived(undefined, 'blue', 'blue')).toBe(true);
    });

    it('should return true when majority is blue and choice is red', () => {
      expect(deriveSurvived(undefined, 'blue', 'red')).toBe(true);
    });
  });

  describe('red majority', () => {
    it('should return true when majority is red and choice is red', () => {
      expect(deriveSurvived(undefined, 'red', 'red')).toBe(true);
    });

    it('should return false when majority is red and choice is blue', () => {
      expect(deriveSurvived(undefined, 'red', 'blue')).toBe(false);
    });
  });
});
