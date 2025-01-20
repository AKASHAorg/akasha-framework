import React from 'react';
import Icon from '../Icon';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icon/hero-icons-outline';
import { MONTHS_IN_A_YEAR } from './calendarHelpers';
import { tw, tx } from '@twind/core';
import Button from '../Button';
import Text from '../Text';

export const wrapperStyle =
  'bg-white dark:bg-grey3 mt-10 rounded-[0.5rem] shadow p-4 w-full absolute top-0 left-0 z-[9999]';
const baseMonthCellStyle = 'grid place-items-center w-full h-full py-3';
export const selectedCellStyle = 'text-white bg-secondaryLight dark:(bg-secondaryDark text-white)';
export const unselectedCellStyle = 'text-grey5 dark:text-grey7';

interface MonthSelectorProps {
  currentMonth: number;
  currentYear: number;
  handleMonthSelect: (index: number) => void;
  goToNextYear: () => void;
  goToPreviousYear: () => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentMonth,
  currentYear,
  handleMonthSelect,
  goToNextYear,
  goToPreviousYear,
}) => {
  const displayMonths = MONTHS_IN_A_YEAR.map((month, index) => (
    <Button
      plain={true}
      customStyle={`${baseMonthCellStyle} ${
        currentMonth === index ? `${selectedCellStyle} rounded-[0.5rem]` : unselectedCellStyle
      }`}
      key={index}
      onClick={() => handleMonthSelect(index)}
    >
      {month}
    </Button>
  ));

  return (
    <div className={tw(wrapperStyle)}>
      <div className={tw('flex justify-between items-center')}>
        <div>
          <Button onClick={goToPreviousYear} plain={true}>
            <Icon icon={<ChevronLeftIcon />} accentColor={true} hover={true} />
          </Button>
        </div>
        <div>
          <Text variant="h6" color={{ light: 'secondaryLight', dark: 'secondaryDark' }}>
            {currentYear}
          </Text>
        </div>
        <div>
          <Button onClick={goToNextYear} plain={true}>
            <Icon icon={<ChevronRightIcon />} accentColor={true} hover={true} hoverColor="white" />
          </Button>
        </div>
      </div>
      <div className={tx('grid grid-cols-3 justify-items-center mt-3')}>{displayMonths}</div>
    </div>
  );
};

export default MonthSelector;
