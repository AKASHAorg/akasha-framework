import React, { Fragment, forwardRef } from 'react';
import Card from '../Card';
import Stack from '../Stack';
import Tooltip from '../Tooltip';
import ListElement from './list-element';
import { getColorClasses } from '../../utils';
import { TextProps } from '../Text';

type Selected = { index: number; label?: string };

export type ListItem = {
  label: string;
  icon?: React.ReactElement;
  toolTipContent?: string;
  disabled?: boolean;
  onClick?: (label?: string) => void;
} & TextProps;

export type ListProps = {
  items: ListItem[];
  showDivider?: boolean;
  customStyle?: string;
  onSelected?: ({ index, label }: Selected) => void;
};

/**
 * A List component is basically a Card that contains multiple items listed line by line.
 * A List differs from a Dropdown in many ways:
 * - A list displays all the items at once while a dropdown only shows one item until clicked.
 * - A list is better for multiple selections or navigation. A dropdown is better for single
 * selections and forms.
 * @param items - items to be displayed
 * @param showDivider - boolean (optional) whether to show a divider between list items
 * @param ref - (optional) pass the ref here
 * @param customStyle - (optional) add your custom styling (Please use Tailwind classes)
 * @param onSelected - (optional) callback function for when an item is selected
 * @example
 * ```tsx
 *     <List
 *       items={[
 *       { label: 'Upload', icon: <ArrowUpOnSquareIcon />, onClick: () => ({}) },
 *       { label: 'Edit', icon: <PencilIcon />, onClick: () => ({}) }]}
 *     />
 * ```
 **/
const List = forwardRef<HTMLDivElement, ListProps>(
  ({ items, showDivider = true, customStyle = '', onSelected }, ref) => {
    const borderStyle = showDivider
      ? `border-b ${getColorClasses(
          {
            light: 'grey8',
            dark: 'grey3',
          },
          'border',
        )}`
      : '';
    const baseStyle = borderStyle;
    const hoverStyle = getColorClasses({ light: 'grey8', dark: 'grey5' }, 'hover:bg');

    const handleItemClick = (item: ListItem, index: number) => () => {
      if (item.onClick) {
        item.onClick(item.label);
      }
      if (onSelected) {
        onSelected({ index, label: item.label });
      }
    };

    return (
      <Card radius={8} padding={0} customStyle={customStyle} ref={ref}>
        <Stack direction="column">
          {items.map((item, index) => (
            <Fragment key={index}>
              {item.toolTipContent ? (
                <Tooltip placement="left" content={item.toolTipContent}>
                  <ListElement
                    {...item}
                    onClick={handleItemClick(item, index)}
                    customStyle={`${baseStyle} ${hoverStyle} first:rounded-t-[0.5rem]	last:rounded-b-[0.5rem]`}
                  />
                </Tooltip>
              ) : (
                <ListElement
                  {...item}
                  onClick={handleItemClick(item, index)}
                  customStyle={`${baseStyle} ${hoverStyle} first:rounded-t-[0.5rem]	last:rounded-b-[0.5rem]`}
                />
              )}
            </Fragment>
          ))}
        </Stack>
      </Card>
    );
  },
);

export default List;
