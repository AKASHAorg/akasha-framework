import React from 'react';
import { tw } from '@twind/core';

import { Button } from '../Button';

import { IModerationAppErrorCardProps } from '../../interfaces/moderationAppErrorCard';

const ModerationAppErrorCard: React.FC<IModerationAppErrorCardProps> = props => {
  const {
    boxSize,
    errorType,
    titleLabel,
    subtitleLabel,
    buttonLabel,
    textMarginTop,
    textMarginBottom,
    hasButton,
    imageBoxHasMargin,
    publicImgPath = '/images',
    onClick,
  } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const contentWrapperClass =
    'flex flex-col items-center bg-white dark:bg-grey2 pt-0 px-4 md:px-20 pb-5 rounded-lg';

  return (
    <div className={tw(contentWrapperClass)}>
      <div className={tw(`h-[${boxSize}] w-[${boxSize}] mb-${imageBoxHasMargin ? '0.5' : '0'}`)}>
        <img className={tw('object-contain')} src={`${publicImgPath}/${errorType}.webp`} />
      </div>

      <span className={tw('font-semibold mb-0.5 mx-auto text-xl text-center')}>{titleLabel}</span>

      <span
        className={tw(
          `font-normal mt-${textMarginTop ? '0.25' : ''} mb-${
            textMarginBottom ? '1.5' : ''
          } text-secondary text-lg text-center leading-6`,
        )}
      >
        {subtitleLabel}
      </span>

      {hasButton && (
        <div className={tw('w-fit mt-4')}>
          <Button onClick={handleClick} label={buttonLabel} />
        </div>
      )}
    </div>
  );
};

export default ModerationAppErrorCard;
