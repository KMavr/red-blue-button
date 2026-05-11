import { renderHook, act } from '@testing-library/react';
import { useLandingStats } from '../useLandingStats';

function mockFetch(body: unknown, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(body),
    }),
  );
}

describe('useLandingStats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with total null', () => {
      mockFetch({ total: 1000 });
      const { result } = renderHook(() => useLandingStats());

      expect(result.current.total).toBeNull();
    });
  });

  describe('initial fetch', () => {
    it('should fetch /api/results on mount', async () => {
      mockFetch({ total: 1000 });
      renderHook(() => useLandingStats());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(vi.mocked(fetch)).toHaveBeenCalledWith('/api/results', expect.any(Object));
    });

    it('should set total from the API response', async () => {
      mockFetch({ total: 1234 });
      const { result } = renderHook(() => useLandingStats());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.total).toBe(1234);
    });

    it('should keep total null when the response is not ok', async () => {
      mockFetch({}, false);
      const { result } = renderHook(() => useLandingStats());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.total).toBeNull();
    });

    it('should silently ignore fetch errors without throwing', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
      const { result } = renderHook(() => useLandingStats());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.total).toBeNull();
    });
  });

  describe('polling', () => {
    it('should poll every 5 seconds and update total on each response', async () => {
      const fetchMock = vi
        .fn()
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ total: 100 }) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ total: 200 }) });
      vi.stubGlobal('fetch', fetchMock);

      const { result } = renderHook(() => useLandingStats());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      expect(result.current.total).toBe(100);
      expect(fetchMock).toHaveBeenCalledTimes(1);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000);
      });

      expect(result.current.total).toBe(200);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('cleanup', () => {
    it('should stop polling after unmount', async () => {
      mockFetch({ total: 42 });
      const { unmount } = renderHook(() => useLandingStats());

      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });

      const callCountAfterMount = vi.mocked(fetch).mock.calls.length;
      unmount();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(15000);
      });

      expect(vi.mocked(fetch).mock.calls.length).toBe(callCountAfterMount);
    });
  });
});
