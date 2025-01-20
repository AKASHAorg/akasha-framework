import React, { useState, PropsWithChildren, ReactNode } from 'react';
import Card from '../Card';
import Stack from '../Stack';
import Text, { TextProps } from '../Text';
import { apply, tw } from '@twind/core';
import { usePopper } from 'react-popper';
import { useClickAway } from 'react-use';
import { Placement } from '@popperjs/core';
import { getArrowClasses } from './getArrowClasses';
import { getContentClasses } from './getContentClasses';
import { Color } from '../types/common.types';

type TProps = {
  placement: 'top' | 'left' | 'bottom' | 'right';
  content: ReactNode;
  textSize?: TextProps['variant'];
  textColor?: Color;
  trigger?: 'hover' | 'click';
  centerArrowToReference?: boolean;
  arrow?: boolean;
  backgroundColor?: Color;
  customStyle?: string;
  contentCustomStyle?: string;
};

export type TooltipProps = PropsWithChildren<
  TProps | ({ open: boolean; onOpen: () => void; onClose: () => void } & TProps)
>;

const ARROW_SIZE = 8;

type CSSPosition = 'top' | 'left' | 'bottom' | 'right';

const PLACEMENT_TO_CSS_POSITION_MAP: Record<TooltipProps['placement'], CSSPosition> = {
  right: 'left',
  left: 'right',
  bottom: 'top',
  top: 'bottom',
};

/**
 * The ToolTip component offers a quick way to include a UI element that will be displayed when
 * a user hovers over or clicks on an element that you want to include additional information for. The component
 * It supports various placement options, triggers, custom styles, and you can include text or other React elements
 * as content.
 * @param placement - where the tooltip will appear
 * @param content - it can be pure text or another React element
 * @param textSize - (optional) for customizing the text size
 * @param textColor - (optional) for customizing the text color
 * @param trigger - (optional) for controlling when the tooltip will show (on hover or on click)
 * @param centerArrowToReference - boolean (optional) for controlling the tooltip's arrow
 * @param arrow - boolean (optional) whethe the tooltip will have an arrow
 * @param backgroundColor - (optional) for customizing the background color
 * @param customStyle - (optional) apply any other custom styles. Please use standard Tailwind CSS classes
 * @param contentCustomStyle - (optional) for customizing the content's style
 * @example
 * ```tsx
 *  const tooltipContent = 'I am a tooltip';
 *  const label = 'Hover over me to know more';
 *  <Tooltip content={tooltipContent} placement="top">
 *    <>{label}</>
 *  </Tooltip>
 * ```
 **/
const Tooltip: React.FC<TooltipProps> = props => {
  const {
    placement = 'bottom',
    content,
    textSize = 'subtitle2',
    trigger = 'hover',
    centerArrowToReference,
    arrow = true,
    textColor = { light: 'black', dark: 'white' },
    backgroundColor = { light: 'grey9', dark: 'grey3' },
    customStyle = '',
    contentCustomStyle = '',
    children,
  } = props;

  const [referenceElement, setReferenceElement] = useState(null);
  const [contentElement, setContent] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const arrowModifier = {
    name: 'arrow',
    options: {
      element: arrowElement,
    },
  };

  const offsetModifier = {
    name: 'offset',
    options: {
      offset: [0, ARROW_SIZE],
    },
  };

  const { styles, attributes, state } = usePopper(referenceElement, contentElement, {
    placement,
    modifiers: centerArrowToReference ? [arrowModifier, offsetModifier] : [arrowModifier],
  });

  const contentRef = React.createRef<HTMLDivElement>();

  useClickAway(contentRef, () => {
    if ('open' in props) {
      props.onClose();
      return;
    }
    setShowTooltip(false);
  });

  const contextualPlacement = getContextualPlacement(state?.placement);

  const arrowStyle = centerArrowToReference ? styles.arrow : {};

  const isContentOfTypeString = typeof content === 'string';

  const contentStyle = isContentOfTypeString ? 'rounded-[0.375rem] py-[4px] px-[16px]' : '';

  const eventHandlers =
    trigger === 'hover'
      ? {
          onMouseOver: () => {
            if ('open' in props) {
              props.onOpen();
              return;
            }
            setShowTooltip(true);
          },
          onMouseOut: () => {
            if ('open' in props) {
              props.onClose();
              return;
            }
            setShowTooltip(false);
          },
        }
      : {
          onClick: () => {
            if ('open' in props) {
              props.onOpen();
              return;
            }
            setShowTooltip(true);
          },
        };

  return (
    <Stack customStyle={customStyle}>
      <div {...eventHandlers} className={tw(apply`w-fit cursor-pointer`)} ref={setReferenceElement}>
        {children}
      </div>
      {('open' in props ? props.open : showTooltip) && (
        <div
          ref={setContent}
          style={{
            ...styles.popper,
            zIndex: 99,
          }}
          {...attributes.popper}
          className={tw(getContentClasses(contextualPlacement, ARROW_SIZE))}
        >
          {arrow && (
            <div
              ref={setArrowElement}
              style={{
                ...arrowStyle,
                zIndex: 99,
                [PLACEMENT_TO_CSS_POSITION_MAP[contextualPlacement]]: `-${ARROW_SIZE}px`,
              }}
              className={tw(getArrowClasses(contextualPlacement, ARROW_SIZE, backgroundColor))}
            />
          )}
          <Card
            padding={0}
            elevation="2"
            background={isContentOfTypeString ? backgroundColor : null}
            customStyle={`flex-wrap ${contentStyle} ${contentCustomStyle} items-center justify-center dark:shadow-none`}
          >
            <Stack ref={contentRef} align="center" justify="center">
              {isContentOfTypeString ? (
                <Text color={textColor} variant={textSize}>
                  {content}
                </Text>
              ) : (
                content
              )}
            </Stack>
          </Card>
        </div>
      )}
    </Stack>
  );
};

function getContextualPlacement(placement: Placement) {
  if (
    placement === 'top' ||
    placement === 'bottom' ||
    placement === 'left' ||
    placement === 'right'
  )
    return placement;

  return 'bottom';
}

export default Tooltip;
