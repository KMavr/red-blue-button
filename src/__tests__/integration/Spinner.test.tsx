import { render, screen } from '@testing-library/react';
import Spinner from '../../components/Spinner/Spinner';

describe('Spinner', () => {
  it('should render an element with role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should include screen-reader text for accessibility', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
