import { cn } from '../cn';

describe('cn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('basic merging', () => {
    it('should return a single class string unchanged', () => {
      expect(cn('foo')).toBe('foo');
    });

    it('should merge multiple class strings', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should merge three or more class strings', () => {
      expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
    });
  });

  describe('falsy values', () => {
    it('should ignore false values', () => {
      expect(cn('foo', false, 'bar')).toBe('foo bar');
    });

    it('should ignore undefined values', () => {
      expect(cn('foo', undefined, 'bar')).toBe('foo bar');
    });

    it('should ignore null values', () => {
      expect(cn('foo', null, 'bar')).toBe('foo bar');
    });

    it('should return empty string when all values are falsy', () => {
      expect(cn(false, undefined, null)).toBe('');
    });

    it('should return empty string when called with no arguments', () => {
      expect(cn()).toBe('');
    });
  });

  describe('conditional classes', () => {
    it('should include class when condition is true', () => {
      const isActive = true;
      expect(cn('base', isActive && 'active')).toBe('base active');
    });

    it('should exclude class when condition is false', () => {
      const isActive = false;
      expect(cn('base', isActive && 'active')).toBe('base');
    });
  });

  describe('tailwind conflict resolution', () => {
    it('should keep the last padding class when there is a conflict', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
    });

    it('should keep the last text size class when there is a conflict', () => {
      expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    });

    it('should keep the last background color class when there is a conflict', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('should keep the last margin class when there is a conflict', () => {
      expect(cn('m-2', 'm-4')).toBe('m-4');
    });

    it('should not remove non-conflicting classes alongside conflicting ones', () => {
      expect(cn('flex', 'p-2', 'p-4')).toBe('flex p-4');
    });

    it('should handle multiple conflicts in one call', () => {
      expect(cn('p-2', 'text-sm', 'p-4', 'text-lg')).toBe('p-4 text-lg');
    });
  });
});
