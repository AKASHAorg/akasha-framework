import React from 'react';
import { lastValueFrom } from 'rxjs';
import { useTranslation } from 'react-i18next';

import DS from '@akashaproject/design-system';
import getSDK from '@akashaproject/awf-sdk';
import { useInjectedProvider } from '@akashaproject/ui-awf-hooks';

import { RootComponentProps } from '@akashaproject/ui-awf-typings';

import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';

const { Box, SignUpCard } = DS;

export interface IInviteTokenForm {
  submitted: boolean;
  submitting: boolean;
  success: boolean;
  hasError: boolean;
  errorMsg: string;
}

const SignUp: React.FC<RootComponentProps> = _props => {
  const [activeIndex, setActiveIndex] = React.useState<number>(2);
  const [inviteToken, setInviteToken] = React.useState<string>('');
  const [inviteTokenForm, setinviteTokenForm] = React.useState<IInviteTokenForm>({
    submitted: false,
    submitting: false,
    success: false,
    hasError: false,
    errorMsg: '',
  });

  const [injectedProvider, injectedProviderActions] = useInjectedProvider();

  const { t } = useTranslation();
  const sdk = getSDK();

  const DEFAULT_TOKEN_LENGTH = 24;

  const handleIconClick = () => {
    if (activeIndex === 0) return;
    setActiveIndex(prev => prev - 1);
  };

  const handleNextStep = () => {
    setActiveIndex(prev => prev + 1);
  };

  const onInputTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinviteTokenForm({
      submitted: false,
      submitting: false,
      success: false,
      hasError: false,
      errorMsg: '',
    });
    setInviteToken(e.target.value);
  };

  const checkIsValidToken = () => {
    setinviteTokenForm({
      submitted: false,
      submitting: true,
      success: false,
      hasError: false,
      errorMsg: '',
    });
    lastValueFrom(sdk.api.auth.validateInvite(inviteToken))
      .then(() => {
        setinviteTokenForm({
          submitted: true,
          submitting: false,
          success: true,
          hasError: false,
          errorMsg: '',
        });
      })
      .catch((err: Error) => {
        setinviteTokenForm({
          submitted: true,
          submitting: false,
          success: false,
          hasError: true,
          errorMsg: err.message,
        });
      });
  };

  const validateTokenFn = (e: MouseEvent) => {
    e.preventDefault();
    checkIsValidToken();
  };

  const triggerInviteValidation = () => {
    if (inviteToken?.length && inviteToken?.length === DEFAULT_TOKEN_LENGTH) {
      checkIsValidToken();
    }
  };

  React.useEffect(
    triggerInviteValidation,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inviteToken],
  );

  React.useEffect(
    () => {
      injectedProviderActions.getInjectedProvider();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Box width={'38%'} margin={{ top: 'small', horizontal: 'auto', bottom: '0' }}>
      <SignUpCard
        titleLabel="Sign Up"
        activeIndex={activeIndex}
        stepLabels={[
          'Invitation Code',
          'Legal Agreements',
          'Choose How to Sign Up',
          'Sign Wallet Requests',
          'Choose Username',
        ]}
        handleIconClick={handleIconClick}
      >
        {activeIndex === 0 && (
          <StepOne
            paragraphOneLabel={t(
              'We are currently in a private alpha. You need the invitation code we emailed you to sign up.',
            )}
            paragraphTwoBoldLabel={t('If you have not received an invitation code')}
            paragraphTwoAccentLabel={t('you can request to be placed on the waitlist')}
            writeToUsUrl={'mailto:alpha@ethereum.world'}
            paragraphTwoLabel={t('You will get one soon thereafter')}
            paragraphThree={t(
              'Your invitation code is valid! Please proceed to create your account',
            )}
            buttonLabel={t('Continue to Step 2 ')}
            inputLabel={t('Invitation Code')}
            inputPlaceholder={t('Type your invitation code here')}
            noArrowRight={true}
            inputValue={inviteToken}
            submitted={inviteTokenForm.submitted}
            submitting={inviteTokenForm.submitting}
            success={inviteTokenForm.success}
            // also toggle hasError if input value exceeds default token length
            hasError={inviteTokenForm.hasError || inviteToken.length > DEFAULT_TOKEN_LENGTH}
            errorMsg={inviteTokenForm.errorMsg}
            onChange={onInputTokenChange}
            validateTokenFn={validateTokenFn}
            onButtonClick={handleNextStep}
          />
        )}
        {activeIndex === 1 && (
          <StepTwo
            textLegalPartOne={t('Please confirm below that you have read and agree to our')}
            textLegalPartTwo={t('Also acknowledge our')}
            textLegalPartThree={t(
              'as the basis for respectful interactions with each other on Ethereum World',
            )}
            textConnector={t('and')}
            textLegalTerms={t('Terms of Service')}
            textLegalPrivacy={t('Privacy Policy')}
            textLegalConduct={t('Code of Conduct')}
            textLegalTermsLink="/legal/terms-of-service"
            textLegalPrivacyLink="/legal/privacy-policy"
            textLegalConductLink="/legal/code-of-conduct"
            checkboxLabelTerms={t('I accept the Terms of Service')}
            checkboxLabelPrivacy={t('I accept the Privacy Policy')}
            checkboxLabelConduct={t('I acknowledge the Code of Conduct')}
            buttonLabel={t('Continue to Step 3 ')}
            onButtonClick={handleNextStep}
          />
        )}
        {activeIndex === 2 && (
          <StepThree
            paragraphOneLabel={t(
              "You now need to choose how you'll sign up on  Ethereum World. If you are experienced wth Ethereum, you may connect your wallet.",
            )}
            paragraphTwoBoldLabel={t(
              'If you are new to Ethereum, we recommend using the email or social login option.',
            )}
            paragraphTwoLabel={t(
              "As part of signing up, you'll get a free Ethereum wallet tht you can use to send or receive crypto and sign in to other Ethereum sites.",
            )}
            injectedProvider={injectedProvider.name}
            providerDetails={{
              ...injectedProvider.details,
              subtitleLabel: t(injectedProvider.details.subtitleLabel),
            }}
            walletConnectDescription={t(
              'WalletConnect has had reliability problems for us in the past. Consider it experimental at this time.',
            )}
            socialLoginTitleLabel={t('Email or Social Login')}
            socialLoginDescription={t(
              'Use this option to sign up using email, Google, Twitter, Discord, Github, Apple, or one of many other social networks',
            )}
          />
        )}
      </SignUpCard>
    </Box>
  );
};

export default SignUp;
