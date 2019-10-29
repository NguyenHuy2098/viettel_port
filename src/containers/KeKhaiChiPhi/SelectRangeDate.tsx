import React, { useState, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Input } from 'reactstrap';
import useClickOutSide from 'hooks/useClickOutSide';

interface Props {
  handleSelectEndDate: Function;
  handleSelectStartDate: Function;
}

// eslint-disable-next-line max-lines-per-function
function SelectRangeDate(props: Props): JSX.Element {
  const [showSelectDate, setShowSelectDate] = useState(false);
  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState(() => new Date());
  const wrapperRef = useRef(null);

  function handleClickSelectDate(): void {
    setShowSelectDate(!showSelectDate);
  }

  function handleSelectStartDate(date: Date): void {
    setStartDate(date);
    props.handleSelectStartDate(date);
  }

  function handleSelectEndDate(date: Date): void {
    setEndDate(date);
    props.handleSelectEndDate(date);
  }

  useClickOutSide({
    wrapperRef,
    handleClickOutside: () => setShowSelectDate(false),
  });

  function handleChange(): void {
    //
  }

  return (
    <div className="sipFilterColSearch" ref={wrapperRef}>
      <Input
        value={moment(startDate).format('MM/YYYY') + ' - ' + moment(endDate).format('MM/YYYY')}
        onChange={handleChange}
        type="text"
        placeholder="Nhập khoảng thời gian"
        onClick={handleClickSelectDate}
      />
      {showSelectDate && (
        <>
          <DatePicker
            selected={startDate}
            onChange={handleSelectStartDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
          <DatePicker
            selected={endDate}
            onChange={handleSelectEndDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </>
      )}
      <img src={'../../assets/img/icon/iconCalendar.svg'} alt="VTPostek" />
    </div>
  );
}

export default SelectRangeDate;
