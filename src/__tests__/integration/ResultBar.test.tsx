import '../helpers/sharedMocks';
import { render, screen } from '@testing-library/react';
import { I18nTestWrapper } from '../../test/i18nTestWrapper';
import ResultBar from '../../components/ResultBar/ResultBar';

function renderResultBar(props: {
  redPct: number;
  bluePct: number;
  total: number;
  live?: boolean;
}) {
  return render(
    <I18nTestWrapper>
      <ResultBar {...props} />
    </I18nTestWrapper>,
  );
}

describe('ResultBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('percentage labels', () => {
    it('should render the red percentage', () => {
      renderResultBar({ redPct: 39, bluePct: 61, total: 1000 });
      expect(screen.getByText(/39%/)).toBeInTheDocument();
    });

    it('should render the blue percentage', () => {
      renderResultBar({ redPct: 39, bluePct: 61, total: 1000 });
      expect(screen.getByText(/61%/)).toBeInTheDocument();
    });
  });

  describe('live indicator', () => {
    it('should show the live dot when live is true', () => {
      const { container } = renderResultBar({ redPct: 50, bluePct: 50, total: 100, live: true });
      expect(container.querySelector('.live-dot')).toBeInTheDocument();
    });

    it('should not show the live dot when live is false', () => {
      const { container } = renderResultBar({ redPct: 50, bluePct: 50, total: 100, live: false });
      expect(container.querySelector('.live-dot')).not.toBeInTheDocument();
    });

    it('should not show the live dot when live is omitted', () => {
      const { container } = renderResultBar({ redPct: 50, bluePct: 50, total: 100 });
      expect(container.querySelector('.live-dot')).not.toBeInTheDocument();
    });
  });
});
