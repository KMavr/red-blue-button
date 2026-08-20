import { mockNavigate } from '../../__tests__/helpers/mockSetup';
import { mockCookiesSet } from '../../__tests__/helpers/sharedMocks';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useVote } from '../useVote';

function mockFetch(status: number, body: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      status,
      ok: status >= 200 && status < 300,
      json: () => Promise.resolve(body),
    }),
  );
}

describe('useVote', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  describe('initialization', () => {
    it('should initialize with voting false and no error', () => {
      const { result } = renderHook(() => useVote());

      expect(result.current.voting).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.submit).toBe('function');
    });
  });

  describe('successful vote submission', () => {
    const successBody = {
      survived: true,
      results: { red: 40, blue: 60, total: 100, redPct: 40, bluePct: 60, countries: [] },
    };

    it('should POST to /api/vote with the chosen color', async () => {
      mockFetch(200, successBody);
      const { result } = renderHook(() => useVote());

      await act(async () => {
        await result.current.submit('blue');
      });

      expect(vi.mocked(fetch)).toHaveBeenCalledWith('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: 'blue' }),
      });
    });

    it('should set both cookies on success', async () => {
      mockFetch(200, successBody);
      const { result } = renderHook(() => useVote());

      await act(async () => {
        await result.current.submit('red');
      });

      expect(mockCookiesSet).toHaveBeenCalledWith('voted', '1', { expires: 1 });
      expect(mockCookiesSet).toHaveBeenCalledWith('last_choice', 'red', { expires: 365 });
    });

    it('should navigate to /results with results state on success', async () => {
      mockFetch(200, successBody);
      const { result } = renderHook(() => useVote());

      await act(async () => {
        await result.current.submit('blue');
      });

      expect(mockNavigate).toHaveBeenCalledWith('/results', {
        state: { choice: 'blue', results: successBody.results },
      });
    });

    it('should set voting to true while the request is in flight', async () => {
      let resolveFetch!: (value: unknown) => void;
      vi.stubGlobal(
        'fetch',
        vi.fn().mockReturnValue(
          new Promise((resolve) => {
            resolveFetch = resolve;
          }),
        ),
      );
      const { result } = renderHook(() => useVote());

      act(() => {
        result.current.submit('blue');
      });

      expect(result.current.voting).toBe(true);

      await act(async () => {
        resolveFetch({ status: 200, ok: true, json: () => Promise.resolve(successBody) });
      });
    });
  });

  describe('429 already-voted response', () => {
    it('should set both cookies on 429', async () => {
      mockFetch(429, { error: 'Already voted' });
      const { result } = renderHook(() => useVote());

      await act(async () => {
        await result.current.submit('red');
      });

      expect(mockCookiesSet).toHaveBeenCalledWith('voted', '1', { expires: 1 });
      expect(mockCookiesSet).toHaveBeenCalledWith('last_choice', 'red', { expires: 365 });
    });

    it('should navigate to /results with only choice in state and no error on 429', async () => {
      mockFetch(429, { error: 'Already voted' });
      const { result } = renderHook(() => useVote());

      await act(async () => {
        await result.current.submit('blue');
      });

      expect(mockNavigate).toHaveBeenCalledWith('/results', { state: { choice: 'blue' } });
      expect(result.current.error).toBeNull();
    });
  });

  describe('non-OK error responses', () => {
    it('should set error, reset voting, and not navigate or set cookies on 500', async () => {
      mockFetch(500, { error: 'Server error' });
      const { result } = renderHook(() => useVote());

      await act(async () => {
        await result.current.submit('blue');
      });

      expect(result.current.error).toBe('landing-page.error.generic');
      expect(result.current.voting).toBe(false);
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(mockCookiesSet).not.toHaveBeenCalled();
    });
  });

  describe('network failure', () => {
    it('should set network error, reset voting, and not navigate when fetch throws', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));
      const { result } = renderHook(() => useVote());

      await act(async () => {
        await result.current.submit('red');
      });

      expect(result.current.error).toBe('landing-page.error.network');
      expect(result.current.voting).toBe(false);
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should clear a previous error before retrying', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));
      const { result } = renderHook(() => useVote());

      await act(async () => {
        await result.current.submit('red');
      });

      expect(result.current.error).not.toBeNull();

      const successBody = {
        survived: false,
        results: { red: 60, blue: 40, total: 100, redPct: 60, bluePct: 40, countries: [] },
      };
      mockFetch(200, successBody);

      await act(async () => {
        await result.current.submit('red');
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });
  });
});
