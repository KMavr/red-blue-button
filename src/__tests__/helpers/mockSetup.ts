import './sharedMocks';

export const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
  MemoryRouter: ({ children }: { children: unknown }) => children,
}));
