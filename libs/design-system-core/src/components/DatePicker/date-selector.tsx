import React, { useState, useEffect } from 'react';
import Button from '../Button';
import Icon from '../Icon';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icon/hero-icons-outline';
import Stack from '../Stack';
import Text from '../Text';
import { selectedCellStyle, unselectedCellStyle, wrapperStyle } from './month-selector';
import { MONTHS_IN_A_YEAR, DAYS } from './calendarHelpers';

export interface DateSelectorProps {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  firstDate: Date;
  setFirstDate: React.Dispatch<React.SetStateAction<Date>>;
  secondDate: Date;
  setSecondDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedDates: (date: Date) => void;
  handleMonthSelectToggle: () => void;
  compareDate: (currentDay, secondDay?) => boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  month,
  setMonth,
  year,
  setYear,
  firstDate,
  setFirstDate,
  secondDate,
  setSecondDate,
  setSelectedDates,
  handleMonthSelectToggle,
  compareDate,
}) => {
  const [currentMonthDays, setCurrentMonthDays] = useState([]);
  const [previousMonthDays, setPreviousMonthDays] = useState([]);
  const [nextMonthDays, setNextMonthDays] = useState([]);

  useEffect(() => {
    getNoOfDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  const deselectDates = date => {
    if (!isInThePast(date)) {
      const selectedDate = new Date(year, month, date);

      setFirstDate(selectedDate);
      setSecondDate(null);
    }
  };

  // Checks if the day is the current day
  const isToday = date => {
    const today = new Date();
    const newDate = new Date(year, month, date);

    return today.toDateString() === newDate.toDateString() ? true : false;
  };

  // Checks if  day is in the past
  const isInThePast = date => {
    const today = new Date();
    const newDate = new Date(year, month, date);
    return newDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) ? true : false;
  };

  // Calculates the number of days in the given month
  const getNoOfDays = () => {
    // get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // get the day of week that the first day of the month falls in
    const dayOfWeek = new Date(year, month).getDay();

    const currentMonthDaysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDaysArray.push(i);
    }

    /* Calculate days of previous month prior to current month */
    let daysInPreviousMonth = new Date(year, month, 0).getDate();
    const previousMonthDaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      previousMonthDaysArray.push(daysInPreviousMonth--);
    }

    /* Calculate days of next month to be displayed  */
    // get the day of week that the last day of the current month falls in
    const dayOfWeekofLastDayofMonth = new Date(year, month + 1, 0).getDay();
    const nextMonthDaysArray = [];
    for (let i = 1; i <= 6 - dayOfWeekofLastDayofMonth; i++) {
      nextMonthDaysArray.push(i);
    }

    setPreviousMonthDays(() => previousMonthDaysArray.reverse());
    setNextMonthDays(() => nextMonthDaysArray);
    setCurrentMonthDays(() => currentMonthDaysArray);
  };

  // Checking to see if the date has been selected or not
  const checkIfDayIsFirstOrSecondDate = date => {
    const newDate = new Date(year, month, date);

    if (firstDate !== null && secondDate !== null) {
      return (
        newDate.toDateString() == firstDate.toDateString() ||
        newDate.toDateString() == secondDate.toDateString()
      );
    }

    if (firstDate !== null) {
      return newDate.toDateString() == firstDate.toDateString();
    }
    return false;
  };

  // Checking to see which days are between the first and second date
  const inBetweenDays = date => {
    const newDate = new Date(year, month, date);

    if (firstDate !== null && secondDate !== null) {
      return newDate <= secondDate && newDate >= firstDate;
    }
  };

  const getNextMonth = (month, year) => {
    const nextMonth = month < 11 ? month + 1 : 0;
    const nextMonthYear = month < 11 ? year : year + 1;
    setMonth(nextMonth);
    setYear(nextMonthYear);
  };

  const getPreviousMonth = (month, year) => {
    const prevMonth = month > 0 ? month - 1 : 11;
    const prevMonthYear = month > 0 ? year : year - 1;
    setMonth(prevMonth);
    setYear(prevMonthYear);
  };

  const applyCellClasses = (day: string) => {
    const getSelectedDayStyle = () => {
      if (checkIfDayIsFirstOrSecondDate(day)) {
        return `${selectedCellStyle} rounded-[0.5rem]`;
      } else if (inBetweenDays(day)) {
        return selectedCellStyle;
      } else return '';
    };

    const baseStyle = 'text-center w-7';
    const isClickEnabled = isInThePast(day) ? 'pointer-events-none' : 'cursor-pointer';
    const isTodayStyle = isToday(day) ? 'font-bold' : '';
    const selectedDayStyle = getSelectedDayStyle();
    return `${baseStyle} ${unselectedCellStyle} ${isClickEnabled} ${isTodayStyle} ${selectedDayStyle}`;
  };

  const displayDayTitles = DAYS.map((day, index) => {
    return (
      <Stack key={index} padding="px-1">
        <Text variant="footnotes2" color={{ light: 'grey4', dark: 'white' }}>
          {day}
        </Text>
      </Stack>
    );
  });

  const displayCurrentMonthDays = currentMonthDays.map((day, index) => {
    return (
      <Button key={index} plain={true} onClick={secondDate ? () => deselectDates(day) : null}>
        <Stack
          customStyle={`${
            inBetweenDays(day) ? 'px-1 bg-secondaryLight dark:bg-secondaryDark' : 'px-1'
          }
                    ${compareDate(day) && 'rounded-l-[0.5rem]'}
                    ${compareDate(day, secondDate) && 'rounded-r-[0.5rem]'}
                    mb-1
                    `}
        >
          <Button
            plain={true}
            onClick={() => {
              !secondDate ? setSelectedDates(day) : deselectDates;
            }}
            customStyle={applyCellClasses(day)}
          >
            {day}
          </Button>
        </Stack>
      </Button>
    );
  });

  return (
    <Stack customStyle={wrapperStyle}>
      <Stack direction="row" align="center" justify="between">
        <Stack>
          <Button onClick={() => getPreviousMonth(month, year)} plain={true}>
            <Icon icon={<ChevronLeftIcon />} accentColor={true} hover={true} />
          </Button>
        </Stack>
        <Button onClick={handleMonthSelectToggle} plain={true}>
          <Stack direction="row">
            <Text variant="button-lg" color={{ light: 'black', dark: 'white' }}>
              {MONTHS_IN_A_YEAR[month]}
            </Text>
            <Text variant="button-lg" color={{ light: 'black', dark: 'white' }} customStyle="ml-1">
              {year}
            </Text>
          </Stack>
        </Button>
        <Stack>
          <Button onClick={() => getNextMonth(month, year)} plain={true}>
            <Icon icon={<ChevronRightIcon />} accentColor={true} hover={true} />
          </Button>
        </Stack>
      </Stack>
      <Stack justify="center" customStyle="grid grid-cols-7 mt-3 mb-2">
        {displayDayTitles}
      </Stack>
      <Stack customStyle="grid grid-cols-7">
        {previousMonthDays.map((day, index) => {
          return (
            <Stack key={index} padding="px-1" customStyle="mb-1">
              <Stack key={index} customStyle="pointer-events-none w-7">
                <Text
                  variant="button-md"
                  color={{ light: 'grey8', dark: 'grey5' }}
                  customStyle="text-center"
                >
                  {day}
                </Text>
              </Stack>
            </Stack>
          );
        })}
        {displayCurrentMonthDays}
        {nextMonthDays.map((day, index) => {
          return (
            <Stack key={index} padding="px-1" customStyle="mb-1">
              <Stack key={index} customStyle="pointer-events-none text-center">
                <Text
                  variant="button-md"
                  color={{ light: 'grey8', dark: 'grey5' }}
                  customStyle="text-center"
                >
                  {day}
                </Text>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default DateSelector;
