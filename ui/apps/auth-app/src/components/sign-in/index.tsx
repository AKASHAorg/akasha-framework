import React from 'react';
import { RootComponentProps, AnalyticsCategories } from '@akashaorg/typings/ui';
import { EthProviders, INJECTED_PROVIDERS } from '@akashaorg/typings/sdk';

import DS from '@akashaorg/design-system';
import { StyledBox } from './styles';

import {
  switchToRequiredNetwork,
  useAnalytics,
  useConnectProvider,
  useGetProfile,
  useInjectedProvider,
  useNetworkState,
  useRequiredNetworkName,
  useGetLogin,
  useSignUp,
} from '@akashaorg/ui-awf-hooks';

import SignInStatus from './sign-in-status';
import { useTranslation } from 'react-i18next';
import ChooseProvider from './choose-provider';
import RequiredNetworkStep from '../sign-up/steps/required-network';
import SuggestSignup from './suggest-signup';
import { SIGN_UP_USERNAME } from '../../routes';

const { MainAreaCardBox, Box, Heading, Text, Anchor } = DS;

const SignIn: React.FC<RootComponentProps> = props => {
  const [selectedProvider, setSelectedProvider] = React.useState<EthProviders>(EthProviders.None);
  const [signInComplete, setSignInComplete] = React.useState(false);
  const { t } = useTranslation('app-auth-ewa');
  const [analyticsActions] = useAnalytics();

  const routingPlugin = React.useRef(props.plugins['@akashaorg/app-routing']?.routing);

  const loginQuery = useGetLogin();
  const profileDataReq = useGetProfile(loginQuery.data.pubKey, null, loginQuery.isSuccess);

  const connectProviderQuery = useConnectProvider(selectedProvider);

  const injectedProviderQuery = useInjectedProvider();
  const injectedProvider = React.useMemo(
    () => injectedProviderQuery.data,
    [injectedProviderQuery.data],
  );

  const requiredNetworkQuery = useRequiredNetworkName();

  const networkStateQuery = useNetworkState(connectProviderQuery.data);
  const { signUpState, ethAddress, fireRemainingMessages, error, fullSignUp, resetState } =
    useSignUp(selectedProvider, true);

  const signupStateReset = React.useRef(resetState);

  const isNotRegistered = React.useMemo(() => {
    if (error?.message && typeof error.message === 'string') {
      return error.message.toLowerCase().trim() === 'profile not found';
    }
    return false;
  }, [error]);

  React.useEffect(() => {
    if (connectProviderQuery.isError) {
      setSelectedProvider(EthProviders.None);
    }
  }, [connectProviderQuery.isError]);

  React.useEffect(() => {
    if (signInComplete && profileDataReq.isSuccess && !!profileDataReq.data?.userName) {
      const searchParam = new URLSearchParams(location.search);
      routingPlugin.current?.handleRedirect({
        search: searchParam,
        fallback: {
          appName: props.worldConfig.homepageApp,
        },
      });
    }
    if (signInComplete && profileDataReq.isSuccess && !profileDataReq.data?.userName) {
      routingPlugin.current?.navigateTo({
        appName: '@akashaorg/app-auth-ewa',
        getNavigationUrl: routes => routes[SIGN_UP_USERNAME],
      });
    }
  }, [signInComplete, profileDataReq, props.baseRouteName, props.worldConfig.homepageApp]);

  const requiredNetworkName = `${requiredNetworkQuery.data
    .charAt(0)
    .toLocaleUpperCase()}${requiredNetworkQuery.data.substr(1).toLocaleLowerCase()}`;

  const handleSwitchNetworkMetamask = () => {
    switchToRequiredNetwork();
  };

  const handleNetworkRecheck = () => {
    networkStateQuery.refetch();
  };

  const handleProviderSelect = (provider: EthProviders) => {
    resetState();
    setSelectedProvider(provider);
  };

  const handleSignInComplete = () => {
    analyticsActions.trackEvent({
      category: AnalyticsCategories.SIGN_IN,
      action: 'Successful Sign In',
    });
    setSignInComplete(true);
  };

  const networkNotSupported = React.useMemo(() => {
    if (
      selectedProvider !== EthProviders.None &&
      !networkStateQuery.isFetching &&
      connectProviderQuery.data
    ) {
      return networkStateQuery.data.networkNotSupported;
    }
    return false;
  }, [networkStateQuery, selectedProvider, connectProviderQuery.data]);

  const handleNavigateToSignup = (path: string) => {
    routingPlugin.current.navigateTo({
      appName: '@akashaorg/app-auth-ewa',
      getNavigationUrl: () => path,
    });
  };

  return (
    <>
      {isNotRegistered && <SuggestSignup onNavigate={handleNavigateToSignup} />}
      {!isNotRegistered && (
        <MainAreaCardBox pad="large">
          <StyledBox align="center" width="70%" responsive={true} margin="auto" gap="small">
            <Heading
              style={{ userSelect: 'none', width: '100%' }}
              level="4"
              size="medium"
              textAlign="center"
              fill={true}
              margin={{ bottom: 'none' }}
            >
              {t('✨ Welcome to AKASHA World ✨')}
            </Heading>
            <Text size="medium" color="secondaryText">
              {t('Choose a way to connect')}
            </Text>

            <ChooseProvider
              selectedProvider={selectedProvider}
              providerIsConnected={connectProviderQuery.data}
              injectedProvider={injectedProvider}
              onProviderSelect={handleProviderSelect}
            />
          </StyledBox>
          <Box align="center" width="90%" responsive={true} margin="auto">
            <Text
              textAlign={'start'}
              size="medium"
              color={'secondaryText'}
              margin={{ top: '1rem' }}
            >
              {'By connecting to AKASHA world, you agree to our'}
              <Anchor
                size="medium"
                href={'/legal/terms-of-service'}
                label={' Terms & Conditions '}
                target={'_blank'}
              />
              {', '}
              <Anchor
                size="medium"
                href={'/legal/privacy-policy'}
                label={' Privacy Policy, '}
                target={'_blank'}
              />
              {', and '}
              <Anchor
                size="medium"
                href={'/legal/code-of-conduct'}
                label={' Code of Conduct '}
                target={'_blank'}
              />
              {'.'}
            </Text>
          </Box>
          <SignInStatus
            isActive={
              selectedProvider !== EthProviders.None &&
              !networkNotSupported &&
              connectProviderQuery.data
            }
            status={signUpState}
            ethAddress={ethAddress}
            selectedProvider={selectedProvider}
            onSignRequest={() => fireRemainingMessages()}
            onSignIn={fullSignUp.mutate}
            signInError={error}
            requiredNetworkName={requiredNetworkName}
            onSignInComplete={handleSignInComplete}
          />
          {networkNotSupported && (
            <RequiredNetworkStep
              setRequiredNetworkLabel={t('To use Ethereum World during the alpha period, ')}
              setRequiredNetworkBoldLabel={t("you'll need to set the {{ provider }} network to", {
                provider:
                  selectedProvider === EthProviders.WalletConnect
                    ? 'WalletConnect'
                    : injectedProvider.name,
              })}
              setRequiredNetworkAccentLabel={requiredNetworkName}
              injectedProvider={
                selectedProvider === EthProviders.WalletConnect
                  ? INJECTED_PROVIDERS.NOT_DETECTED
                  : injectedProvider.name
              }
              isOnRequiredNetwork={!networkNotSupported}
              onClickSwitchMetamaskNetwork={handleSwitchNetworkMetamask}
              metamaskCTAIntroLabel={t('Click')}
              metamaskCTAAccentLabel={t('here')}
              metamaskCTALabel={t('to change the network.')}
              otherprovidersCTALabel={t('Please change the network manually')}
              variableIconButtonLabel={t('I have set the network to {{requiredNetworkName}}', {
                requiredNetworkName,
              })}
              variableIconErrorLabel={t(
                'Please set the network to {{requiredNetworkName}} and try again.',
                { requiredNetworkName },
              )}
              onClickCheckNetwork={handleNetworkRecheck}
              selectedProvider={selectedProvider}
            />
          )}
        </MainAreaCardBox>
      )}
    </>
  );
};

export default SignIn;
