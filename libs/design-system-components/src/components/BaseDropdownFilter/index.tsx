import * as React from 'react';
import { apply, tw, tx } from '@twind/core';
import { useCloseActions } from '@akashaorg/design-system-core/lib/utils';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Divider from '@akashaorg/design-system-core/lib/components/Divider';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import Card from '@akashaorg/design-system-core/lib/components/Card';

export type DropdownMenuItemGroupType = {
  id: string;
  title: string;
  altTitle?: string;
  icon?: React.ReactElement;
  type?: 'optgroup' | 'opt';
  children?: DropdownMenuItemGroupType[];
};

export type IDropdownFilterProps = {
  name?: string;
  label?: string;
  placeholderLabel?: string;
  selected: DropdownMenuItemGroupType;
  menuItems: DropdownMenuItemGroupType[] | DropdownMenuItemGroupType[];
  setSelected: React.Dispatch<React.SetStateAction<DropdownMenuItemGroupType>>;
  divider?: boolean;
  optgroup?: boolean;
  customStyle?: string;
  padding?: string;
};

/**
 * Base dropdown filter
 */
const DropdownFilter: React.FC<IDropdownFilterProps> = ({
  label,
  placeholderLabel,
  menuItems,
  selected,
  setSelected,
  divider = false,
  optgroup = false,
  customStyle,
  padding = 'p-3',
}) => {
  const [dropOpen, setDropOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (placeholderLabel) {
      setSelected({
        id: '0',
        icon: null,
        title: placeholderLabel,
      });
    } else {
      menuItems[0]?.children ? setSelected(menuItems[0].children[0]) : setSelected(menuItems[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionsWrapperStyle = apply`absolute z-10 max-h-60 mt-14 py-0 rounded-[0.5rem] overflow-auto bg-(white dark:grey3) border(1 grey8 dark:grey5)`;

  const optionStyle = apply`flex items-center justify-between p-3 bg-(hover:grey8 dark:hover:grey3)`;

  const handleDropClick = () => {
    setDropOpen(!dropOpen);
  };

  const anchorRef = useCloseActions(() => {
    setDropOpen(false);
  });

  const handleChange = (menuItem: DropdownMenuItemGroupType) => () => {
    setSelected(menuItem);
    setDropOpen(!dropOpen);
  };

  return (
    <Stack ref={anchorRef} fullWidth customStyle={`relative`} direction="row">
      {label && <Text variant="label">{label}</Text>}

      <button
        className={tx`inline-flex items-center justify-between w-full ${padding} rounded-[0.5rem] bg-(white dark:grey3) rounded-[0.5rem] border-(1 solid ${
          dropOpen ? 'secondaryLight dark:secondark-dark' : 'grey8 dark:grey3'
        }) ${customStyle}`}
        onClick={handleDropClick}
      >
        <Text variant="body1">{selected?.altTitle || selected?.title}</Text>
        {dropOpen ? (
          <Icon icon={<ChevronUpIcon />} customStyle="ml-4" />
        ) : (
          <Icon icon={<ChevronDownIcon />} customStyle="ml-4" />
        )}
      </button>

      {/* <!-- Dropdown menu --> */}
      {dropOpen && (
        <Stack fullWidth customStyle={optionsWrapperStyle} direction="row">
          <ul aria-labelledby="dropdownDefaultButton" className="w-full">
            {menuItems.map((menuItem, idx) => {
              const isSelected = selected?.id === menuItem.id;
              if (optgroup) {
                if (menuItem.type === 'optgroup') {
                  return (
                    <>
                      <Stack direction="row" align="center" customStyle={`pt-3 pl-3`} key={idx}>
                        <Text
                          variant="body2"
                          customStyle="cursor-not-allowed"
                          color={{ light: 'grey5', dark: 'grey8' }}
                        >
                          {menuItem.title}
                        </Text>
                      </Stack>
                      {menuItem?.children &&
                        menuItem.children.map((item, idx) => {
                          return (
                            <li
                              key={idx}
                              className={tw(
                                `${optionStyle}
                                // $ {
                                //   idx < menuItem.children.length - 1
                                //     ? 'border-b(1 grey8 dark:grey3)'
                                //     : ''
                                // }
                                cursor-pointer`,
                              )}
                            >
                              <Card type="plain" onClick={handleChange(item)} customStyle="w-full">
                                <Stack
                                  direction="row"
                                  align="center"
                                  spacing="gap-x-2"
                                  fullWidth
                                  customStyle={`${
                                    selected.id === item.id ? 'text-secondaryLight' : 'text-black'
                                  }`}
                                >
                                  {item?.icon && (
                                    <Icon
                                      icon={item.icon}
                                      color={
                                        selected.id === item.id
                                          ? { light: 'secondaryLight', dark: 'secondaryDark' }
                                          : { light: 'black', dark: 'white' }
                                      }
                                    />
                                  )}
                                  <Text
                                    variant="body1"
                                    color={
                                      selected.id === item.id
                                        ? { light: 'secondaryLight', dark: 'secondaryDark' }
                                        : { light: 'black', dark: 'white' }
                                    }
                                  >
                                    {item.title}
                                  </Text>
                                </Stack>
                              </Card>
                            </li>
                          );
                        })}
                      {divider && <Divider />}
                    </>
                  );
                } else {
                  return (
                    <li
                      key={idx}
                      className={tw(
                        `${optionStyle}
                        ${idx < menuItems.length - 1 ? 'border-b(1 grey8 dark:grey5)' : ''}
                        cursor-pointer`,
                      )}
                    >
                      <Button onClick={handleChange(menuItem)} plain customStyle="w-full">
                        <Stack
                          direction="row"
                          align="center"
                          spacing="gap-x-2"
                          fullWidth
                          customStyle={`${isSelected ? 'text-secondaryLight' : 'text-black'}`}
                        >
                          {menuItem?.icon && (
                            <Icon
                              icon={menuItem.icon}
                              color={
                                isSelected
                                  ? { light: 'secondaryLight', dark: 'secondaryDark' }
                                  : { light: 'black', dark: 'white' }
                              }
                            />
                          )}
                          <Text
                            variant="body1"
                            color={
                              isSelected
                                ? { light: 'secondaryLight', dark: 'secondaryDark' }
                                : { light: 'black', dark: 'white' }
                            }
                          >
                            {menuItem.title}
                          </Text>
                        </Stack>
                      </Button>
                    </li>
                  );
                }
              } else {
                return (
                  <li
                    key={idx}
                    className={tw(
                      `${optionStyle} ${
                        idx < menuItems.length - 1 ? 'border-b(1 grey8 dark:grey3)' : ''
                      } cursor-pointer`,
                    )}
                  >
                    <Card type="plain" onClick={handleChange(menuItem)} customStyle="w-full">
                      <Stack
                        direction="row"
                        align="center"
                        spacing="gap-x-2"
                        fullWidth
                        customStyle={`${isSelected ? 'text-secondaryLight' : 'text-black'}`}
                      >
                        {menuItem?.icon && (
                          <Icon
                            icon={menuItem.icon}
                            color={
                              isSelected
                                ? { light: 'secondaryLight', dark: 'secondaryDark' }
                                : { light: 'black', dark: 'white' }
                            }
                          />
                        )}
                        <Text
                          variant="body1"
                          color={
                            isSelected
                              ? { light: 'secondaryLight', dark: 'secondaryDark' }
                              : { light: 'black', dark: 'white' }
                          }
                        >
                          {menuItem.title}
                        </Text>
                        {isSelected && (
                          <span className={tw('ml-4')}>
                            <Icon
                              icon={<CheckIcon />}
                              color={{ light: 'secondaryLight', dark: 'secondaryDark' }}
                            />
                          </span>
                        )}
                      </Stack>
                    </Card>
                  </li>
                );
              }
            })}
          </ul>
        </Stack>
      )}
    </Stack>
  );
};

export default DropdownFilter;
