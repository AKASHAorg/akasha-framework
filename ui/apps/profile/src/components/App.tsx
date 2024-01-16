import React from 'react';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import { I18nextProvider } from 'react-i18next';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import { RouterProvider } from '@tanstack/react-router';
import { createRouter } from './app-routes';
import { useApolloClient } from '@apollo/client';

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

type AppProps = {
  baseRouteName: string;
};

const App: React.FC<AppProps> = props => {
  const { baseRouteName } = props;
  const { getTranslationPlugin } = useRootComponentProps();
  const apolloClient = useApolloClient();

  return (
    <I18nextProvider i18n={getTranslationPlugin().i18n}>
      <Stack direction="column" spacing="gap-y-4">
        <RouterProvider router={createRouter(baseRouteName, apolloClient)} />
      </Stack>
    </I18nextProvider>
  );
};

export default App;
