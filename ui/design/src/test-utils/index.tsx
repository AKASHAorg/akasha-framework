import { fireEvent, queries, render } from '@testing-library/react';
import { Grommet, ThemeType } from 'grommet';
import React, { ReactElement } from 'react';
import lightTheme from '../styles/themes/light/light-theme';

export const wrapWithTheme = (children: React.ReactNode) => {
  return <Grommet theme={lightTheme as ThemeType}>{children}</Grommet>;
};

export const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return <Grommet theme={lightTheme as ThemeType}>{children}</Grommet>;
};

export const delay = (ms = 100) => new Promise(res => setTimeout(res, ms));

export const customRender = (ui: ReactElement, options: Record<string, unknown>) =>
  render(ui, { wrapper: WithProviders, queries: { ...queries }, ...options });

export const resizeWindow = (width: number, height: number) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.innerWidth = width;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.innerHeight = height;
  fireEvent(window, new Event('resize'));
};

export const createFile = (name: string, type = 'image/png') => {
  return new File(['test-file-content'], name, { type });
};
