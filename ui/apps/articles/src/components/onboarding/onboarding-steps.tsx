import React from 'react';
import { useTranslation } from 'react-i18next';

import { RootComponentProps } from '@akashaorg/ui-awf-typings';

import StepOne from './step-one';

import menuRoute, {
  ONBOARDING_STEP_ONE,
  ONBOARDING_STEP_TWO,
  ONBOARDING_STEP_THREE,
  HOME,
} from '../../routes';
import StepTwo from './step-two';

interface IOnboardingStepsProps {
  activeIndex?: number;
}

const ArticlesOnboardingSteps: React.FC<RootComponentProps & IOnboardingStepsProps> = props => {
  const {
    plugins: { routing },
  } = props;

  const [activeIndex, setActiveIndex] = React.useState<number>(props.activeIndex || 0);

  const { t } = useTranslation('app-articles');

  const pathnameArr = [ONBOARDING_STEP_ONE, ONBOARDING_STEP_TWO, ONBOARDING_STEP_THREE].map(
    el => `${props.baseRouteName}${menuRoute[el]}`,
  );

  React.useEffect(() => {
    const idx = pathnameArr.indexOf(location.pathname);
    if (idx === -1) {
      return setActiveIndex(0);
    }
    setActiveIndex(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleClick = (step: string) => () => {
    routing.navigateTo({
      appName: '@akashaorg/app-articles',
      getNavigationUrl: () => menuRoute[step],
    });
  };

  return (
    <>
      {activeIndex === 0 && (
        <StepOne
          titleLabel={t('Writing Your First Article')}
          textLine1Label={t("It's quite easy! 😉")}
          textLine2Label={t(
            'Our article editor features pretty awesome stuff like adding blocks to your article that will help you elaborate your story better!',
          )}
          textLine3Label={t(
            'Be sure to visit the integration center every now and then to check the apps that comes with great blocks for your articles!',
          )}
          skipLabel={t('Skip')}
          nextLabel={t('Next')}
          onClickIcon={handleClick(HOME)}
          onClickSkip={handleClick(ONBOARDING_STEP_TWO)}
          onClickNext={handleClick(ONBOARDING_STEP_TWO)}
        />
      )}
      {activeIndex === 1 && (
        <StepTwo
          titleLabel={t('Installing Apps For Blocks')}
          textLine1Label={t(
            'Did you know what by installing these applications you will have some awesome extra blocks for you to add in your articles 🙀',
          )}
          skipLabel={t('Skip')}
          nextLabel={t('Next')}
          onClickIcon={handleClick(ONBOARDING_STEP_ONE)}
          onClickSkip={handleClick(ONBOARDING_STEP_THREE)}
          onClickNext={handleClick(ONBOARDING_STEP_THREE)}
        />
      )}
    </>
  );
};

export default ArticlesOnboardingSteps;
