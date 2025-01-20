import React, { useState, useEffect } from 'react';
import { useClickAway } from 'react-use';
import Button from '../Button';
import Icon from '../Icon';
import { CalendarIcon } from '../Icon/hero-icons-outline';
import Stack from '../Stack';
import Text from '../Text';
import MonthSelector from './month-selector';
import DateSelector from './date-selector';

export type TDatePickerProps = {
  placeholderLabel?: string;
};

/**
 * A DatePicker component provides a fast and easy way to include a date picker in your app.
 * @param placeholderLabel - (optional) string
 * ```tsx
 *  <DatePicker
 *    placeholderLabel='Select a date'
 *   />
 * ```
 **/
const DatePicker: React.FC<TDatePickerProps> = props => {
  const { placeholderLabel = 'Select date' } = props;

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showMonthpicker, setShowMonthpicker] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState(placeholderLabel);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);

  // Calculates the range in days between the first and second date
  const setSelectedDates = date => {
    const selectedDate = new Date(year, month, date);

    if (!firstDate) {
      setFirstDate(selectedDate);
      return;
    }

    // cannot select a second date that is prior to the first date selected
    if (selectedDate < firstDate) {
      return;
    }
    setSecondDate(selectedDate);
    setShowDatepicker(() => false);
  };

  // Checking to see if day is the first date
  const compareDate = (date, comparedDate = firstDate) => {
    const newDate = new Date(year, month, date);

    if (firstDate !== null && secondDate !== null) {
      return newDate.toDateString() == comparedDate.toDateString();
    }
  };

  useEffect(() => {
    // update input's content when both dates have been selected
    if (firstDate !== null && secondDate !== null) {
      setDatepickerValue(() => firstDate.toDateString() + ' - ' + secondDate.toDateString());
    }
  }, [firstDate, secondDate]);

  const handleMonthSelect = monthIndex => {
    setMonth(monthIndex);
    setShowMonthpicker(false);
    setShowDatepicker(true);
  };

  const handleMonthSelectToggle = () => {
    setShowDatepicker(false);
    setShowMonthpicker(true);
  };

  const wrapperRef = React.createRef<HTMLDivElement>();

  useClickAway(wrapperRef, () => {
    setShowDatepicker(false);
    setShowMonthpicker(false);
  });

  return (
    <Stack dataTestId="date-picker" fullWidth={true} customStyle="relative md:w-80">
      <Button
        plain={true}
        onClick={() => {
          setShowDatepicker(() => !showDatepicker);
          setShowMonthpicker(false);
        }}
      >
        <Stack
          direction="row"
          align="center"
          justify="start"
          customStyle={`border(1 grey8) dark:border(1 grey5) rounded-[0.5rem] px-2 w-full h-8 cursor-pointer ${
            showDatepicker ? 'border(2 secondaryLight) dark:border(2 secondaryDark)' : ''
          })`}
        >
          <Icon icon={<CalendarIcon />} accentColor={true} />
          <Text variant="body2" color={{ light: 'black', dark: 'grey6' }} customStyle="ml-2">
            {datepickerValue.toString()}
          </Text>
        </Stack>
      </Button>

      <Stack ref={wrapperRef} customStyle="w-full h-full">
        {showDatepicker && (
          <DateSelector
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            handleMonthSelectToggle={handleMonthSelectToggle}
            compareDate={compareDate}
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            secondDate={secondDate}
            setSecondDate={setSecondDate}
            setSelectedDates={setSelectedDates}
          />
        )}
        {showMonthpicker && (
          <MonthSelector
            currentMonth={month}
            currentYear={year}
            handleMonthSelect={handleMonthSelect}
            goToNextYear={() => setYear(year => year + 1)}
            goToPreviousYear={() => setYear(year => year - 1)}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default DatePicker;
