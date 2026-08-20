import { mockCookiesGet } from '../../__tests__/helpers/sharedMocks';
import { renderHook, act } from '@testing-library/react';
import { useResults } from '../useResults';

const mockNavigate = vi.fn();
let mockLocationState: Record<string, unknown> | null = null;

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: mockLocationState }),
}));

const MOCK_RESULTS = {
  red: 40,
  blue: 60,
  total: 100,
  redPct: 40,
  bluePct: 60,
  countries: [],
};

function mockFetch(body: unknown, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(body),
    }),
  );
}

describe('useResults', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
    vi.useFakeTimers();
    mockLocationState = null;
    mockCookiesGet.mockReturnValue('1');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('vote guard', () => {
    it('should redirect to / when the voted cookie is absent', async () => {
      mockCookiesGet.mockReturnValue(undefined);
      mockFetch(MOCK_RESULTS);
      renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    it('should not redirect when the voted cookie is present', async () => {
      mockFetch(MOCK_RESULTS);
      renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('initial fetch', () => {
    it('should start in loading state when no state.results provided', () => {
      mockFetch(MOCK_RESULTS);
      const { result } = renderHook(() => useResults());

      expect(result.current.loading).toBe(true);
    });

    it('should fetch /api/results on mount when no state.results provided', async () => {
      mockFetch(MOCK_RESULTS);
      renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(vi.mocked(fetch)).toHaveBeenCalledWith('/api/results', expect.any(Object));
    });

    it('should populate results, clear loading, and set live after a successful fetch', async () => {
      mockFetch(MOCK_RESULTS);
      const { result } = renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.results).toEqual(MOCK_RESULTS);
      expect(result.current.loading).toBe(false);
      expect(result.current.live).toBe(true);
    });
  });

  describe('state.results provided (post-vote navigation)', () => {
    it('should skip the initial fetch and use state values for results and choice', () => {
      mockLocationState = { choice: 'blue', results: MOCK_RESULTS };
      mockFetch(MOCK_RESULTS);
      const { result } = renderHook(() => useResults());

      expect(result.current.loading).toBe(false);
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
      expect(result.current.results).toEqual(MOCK_RESULTS);
      expect(result.current.survived).toBe(true);
      expect(result.current.choice).toBe('blue');
    });
  });

  describe('choice fallback to cookie', () => {
    it('should read choice from last_choice cookie when no state.choice', () => {
      mockCookiesGet.mockImplementation((key: string) => {
        if (key === 'voted') return '1';
        if (key === 'last_choice') return 'blue';
        return undefined;
      });
      mockFetch(MOCK_RESULTS);
      const { result } = renderHook(() => useResults());

      expect(result.current.choice).toBe('blue');
    });
  });

  describe('majority and survived derivation', () => {
    it('should derive majority as blue when blue >= red (including ties)', async () => {
      const fetchMock = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ ...MOCK_RESULTS, red: 40, blue: 60 }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ ...MOCK_RESULTS, red: 50, blue: 50 }),
        });
      vi.stubGlobal('fetch', fetchMock);
      const { result } = renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.majority).toBe('blue');

      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000);
      });

      expect(result.current.majority).toBe('blue');
    });

    it('should derive majority as red when red > blue', async () => {
      mockFetch({ ...MOCK_RESULTS, red: 70, blue: 30 });
      const { result } = renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.majority).toBe('red');
    });

    it('should return null majority before results are loaded', () => {
      vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));
      const { result } = renderHook(() => useResults());

      expect(result.current.majority).toBeNull();
    });
  });

  describe('polling', () => {
    it('should poll /api/results every 5 seconds', async () => {
      mockFetch(MOCK_RESULTS);
      renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      const afterMount = vi.mocked(fetch).mock.calls.length;

      await act(async () => {
        vi.advanceTimersByTime(5000);
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(vi.mocked(fetch).mock.calls.length).toBeGreaterThan(afterMount);
    });
  });

  describe('error handling', () => {
    it('should set error to true when the initial fetch fails and no results exist', async () => {
      mockFetch({}, false);
      const { result } = renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.error).toBe(true);
    });

    it('should keep existing results when a polling fetch fails', async () => {
      mockLocationState = { choice: 'blue', results: MOCK_RESULTS };
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: false, json: () => Promise.resolve({}) }),
      );
      const { result } = renderHook(() => useResults());

      await act(async () => {
        vi.advanceTimersByTime(5000);
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.results).toEqual(MOCK_RESULTS);
      expect(result.current.error).toBe(false);
    });
  });

  describe('cleanup', () => {
    it('should stop polling after unmount', async () => {
      mockFetch(MOCK_RESULTS);
      const { unmount } = renderHook(() => useResults());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      const callCountAfterMount = vi.mocked(fetch).mock.calls.length;
      unmount();

      await act(async () => {
        vi.advanceTimersByTime(15000);
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(vi.mocked(fetch).mock.calls.length).toBe(callCountAfterMount);
    });
  });
});
