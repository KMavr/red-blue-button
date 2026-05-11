import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { RenderOptions } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nTestWrapper } from './i18nTestWrapper';

interface Options extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export function renderWithRouter(
  ui: ReactNode,
  { initialEntries = ['/'], ...options }: Options = {},
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries}>
        <I18nTestWrapper>{children}</I18nTestWrapper>
      </MemoryRouter>
    ),
    ...options,
  });
}
