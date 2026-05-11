import '../helpers/sharedMocks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nTestWrapper } from '../../test/i18nTestWrapper';
import VoteButton from '../../components/VoteButton/VoteButton';
import type { Choice } from '../../types';

function renderVoteButton(props: {
  color: Choice;
  disabled: boolean;
  onVote: (c: Choice) => void;
  isSelected?: boolean;
}) {
  return render(
    <I18nTestWrapper>
      <VoteButton {...props} />
    </I18nTestWrapper>,
  );
}

describe('VoteButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the red button with its translation key as aria-label', () => {
      renderVoteButton({ color: 'red', disabled: false, onVote: vi.fn() });
      expect(
        screen.getByRole('button', { name: 'landing-page.vote-button.red.label' }),
      ).toBeInTheDocument();
    });

    it('should render the blue button with its translation key as aria-label', () => {
      renderVoteButton({ color: 'blue', disabled: false, onVote: vi.fn() });
      expect(
        screen.getByRole('button', { name: 'landing-page.vote-button.blue.label' }),
      ).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
      renderVoteButton({ color: 'red', disabled: true, onVote: vi.fn() });
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should not be disabled when disabled prop is false', () => {
      renderVoteButton({ color: 'red', disabled: false, onVote: vi.fn() });
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('click behaviour', () => {
    it('should call onVote with the choice when clicked and enabled', async () => {
      const onVote = vi.fn();
      const user = userEvent.setup();
      renderVoteButton({ color: 'blue', disabled: false, onVote });

      await user.click(screen.getByRole('button'));

      expect(onVote).toHaveBeenCalledWith('blue');
      expect(onVote).toHaveBeenCalledTimes(1);
    });

    it('should not call onVote when the button is disabled', async () => {
      const onVote = vi.fn();
      const user = userEvent.setup();
      renderVoteButton({ color: 'red', disabled: true, onVote });

      await user.click(screen.getByRole('button'));

      expect(onVote).not.toHaveBeenCalled();
    });

    it('should not call onVote when isSelected is true', async () => {
      const onVote = vi.fn();
      const user = userEvent.setup();
      renderVoteButton({ color: 'red', disabled: false, onVote, isSelected: true });

      await user.click(screen.getByRole('button'));

      expect(onVote).not.toHaveBeenCalled();
    });
  });
});
