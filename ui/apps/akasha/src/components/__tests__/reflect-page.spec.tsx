import React from 'react';
import ReflectionPage from '../pages/entry-page/reflection-page';
import ReflectEditor from '../reflect-editor';

import { renderWithAllProviders, act, genAppProps } from '@akashaorg/af-testing';
import { AnalyticsProvider } from '@akashaorg/ui-awf-hooks/lib/use-analytics';
import { when } from 'jest-when';

const partialArgs = (...argsToMatch) =>
  when.allArgs((args, equals) => equals(args, expect.arrayContaining(argsToMatch)));

const MockedInlineEditor = ({ action }) => (
  <ReflectEditor beamId="oxaa" reflectToId="oxaa" showEditorInitialValue={false} />
);

describe('< ReflectPage /> component', () => {
  const BaseComponent = (
    <AnalyticsProvider {...genAppProps()}>
      <ReflectionPage />
    </AnalyticsProvider>
  );

  beforeAll(() => {
    // (
    //   jest.spyOn(profileHooks, 'useGetProfile') as unknown as jest.SpyInstance<{
    //     data: Record<string, unknown>;
    //     status: string;
    //   }>
    // ).mockReturnValue({ data: genLoggedInState(true), status: 'success' });
  });
  // @TODO fix after new hooks
  it.skip('should render reflect page', async () => {
    const spiedExtension = jest.fn();

    when(spiedExtension)
      .calledWith(
        partialArgs(
          expect.objectContaining({ name: expect.stringMatching(/inline-editor_reflect/) }),
        ),
      )
      .mockReturnValue(<MockedInlineEditor action="reflect" />);

    await act(async () => {
      renderWithAllProviders(BaseComponent, {});
    });

    // expect(screen.getByText(/Reflect to/i)).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /Reflect/i })).toBeInTheDocument();
  });
});