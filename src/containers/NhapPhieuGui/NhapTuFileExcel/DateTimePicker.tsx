import React, { useState, useRef, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Input } from 'reactstrap';
import useClickOutSide from 'hooks/useClickOutSide';

interface Props {
  handleSelectEndDate: Function;
  handleSelectStartDate: Function;
  startDate?: Date;
  endDate?: Date;
}

// eslint-disable-next-line max-lines-per-function
function SelectRangeDate(props: Props): JSX.Element {
  const [showSelectDate, setShowSelectDate] = useState(false);
  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState(() => new Date());
  const wrapperRef = useRef(null);

  useEffect(() => {
    props.startDate && setStartDate(props.startDate);
    props.endDate && setEndDate(props.endDate);
  }, [props.startDate, props.endDate]);

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
    <div className="sipFilterColSearch sipFilterColDateRangeContainer" ref={wrapperRef}>
      <Input
        value={moment(startDate).format('DD/MM/YYYY') + ' - ' + moment(endDate).format('DD/MM/YYYY')}
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
            dateFormat="DD/MM/yyyy"
            maxDate={new Date()}
            inline
          />
          <DatePicker
            selected={endDate}
            onChange={handleSelectEndDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="DD/MM/yyyy"
            maxDate={new Date()}
            inline
          />
        </>
      )}
      <img src={'../../assets/img/icon/iconCalendar.svg'} alt="VTPostek" />
    </div>
  );
}

export default SelectRangeDate;
