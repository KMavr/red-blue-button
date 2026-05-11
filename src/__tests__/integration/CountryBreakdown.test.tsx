import '../helpers/sharedMocks';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nTestWrapper } from '../../test/i18nTestWrapper';
import CountryBreakdown from '../../components/CountryBreakdown/CountryBreakdown';
import type { CountryResult } from '../../types';

const COUNTRIES: CountryResult[] = [
  { country: 'FR', red: 80, blue: 120, total: 200 }, // France
  { country: 'US', red: 100, blue: 200, total: 300 }, // United States
  { country: 'DE', red: 50, blue: 100, total: 150 }, // Germany
];

function renderBreakdown(countries: CountryResult[] = COUNTRIES) {
  return render(
    <I18nTestWrapper>
      <CountryBreakdown countries={countries} />
    </I18nTestWrapper>,
  );
}

describe('CountryBreakdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render nothing when countries list is empty', () => {
      const { container } = renderBreakdown([]);
      expect(container.firstChild).toBeNull();
    });

    it('should render one row per country', () => {
      renderBreakdown();
      expect(screen.getAllByRole('listitem')).toHaveLength(COUNTRIES.length);
    });

    it('should render the flag emoji for each country', () => {
      renderBreakdown();
      expect(screen.getByText('🇫🇷')).toBeInTheDocument();
      expect(screen.getByText('🇺🇸')).toBeInTheDocument();
      expect(screen.getByText('🇩🇪')).toBeInTheDocument();
    });

    it('should render the globe emoji and unknown label for country code XX', () => {
      renderBreakdown([{ country: 'XX', red: 10, blue: 20, total: 30 }]);
      expect(screen.getByText('🌐')).toBeInTheDocument();
      expect(screen.getByText('common.unknown')).toBeInTheDocument();
    });

    it('should render red and blue percentages for each country', () => {
      renderBreakdown([{ country: 'US', red: 100, blue: 300, total: 400 }]);
      expect(screen.getByText('25%')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  describe('sorting', () => {
    it('should sort by votes descending by default', () => {
      renderBreakdown();
      const items = screen.getAllByRole('listitem');
      // Default: US (300) → FR (200) → DE (150)
      expect(within(items[0]).getByText('🇺🇸')).toBeInTheDocument();
      expect(within(items[1]).getByText('🇫🇷')).toBeInTheDocument();
      expect(within(items[2]).getByText('🇩🇪')).toBeInTheDocument();
    });

    it('should sort alphabetically when the alpha button is clicked', async () => {
      const user = userEvent.setup();
      renderBreakdown();

      await user.click(
        screen.getByRole('button', { name: 'results-page.country-breakdown.sort.alpha' }),
      );

      const items = screen.getAllByRole('listitem');
      // Alpha: France → Germany → United States
      expect(within(items[0]).getByText('🇫🇷')).toBeInTheDocument();
      expect(within(items[1]).getByText('🇩🇪')).toBeInTheDocument();
      expect(within(items[2]).getByText('🇺🇸')).toBeInTheDocument();
    });

    it('should return to votes order when the votes button is clicked after alpha', async () => {
      const user = userEvent.setup();
      renderBreakdown();

      await user.click(
        screen.getByRole('button', { name: 'results-page.country-breakdown.sort.alpha' }),
      );
      await user.click(
        screen.getByRole('button', { name: 'results-page.country-breakdown.sort.votes' }),
      );

      const items = screen.getAllByRole('listitem');
      expect(within(items[0]).getByText('🇺🇸')).toBeInTheDocument();
    });
  });
});
