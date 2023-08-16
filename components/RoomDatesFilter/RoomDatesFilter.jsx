"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "react-dates/initialize";
import {
  DateRangePicker
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import styles from "./RoomDatesFilter.module.css";

// util
import {
  dateFormat,
  daysFromToday
} from "../../util/dates";
import { countText } from "../../util/helpers";
// components
import { Portal, SimpleLineIcon } from "..";

export function RoomDatesFilter(props) {
  const {
    onSearchChange
  } = props;

  const router = useRouter();
  const {
    checkin,
    checkout,
    nquartos,
    nviajantes
  } = router.query;

  const _startDate = null;
  const _endDate = null;

  const [startDate, setStartDate] = useState(_startDate);
  const [endDate, setEndDate] = useState(_endDate);

  const [openSearchCount, setSearchCount] = useState(false);
  const [numQuartos, setNumQuartos] = useState(Number(nquartos || 1));
  const [numViajantes, setNumViajantes] = useState(Number(nviajantes || 1));

  const [focusedInput, setFocusedInput] = useState(null);

  const _defaultStart = checkin || daysFromToday(7);
  const _defaultEnd = checkout || daysFromToday(8);

  const [searchAttributes, setSearchAttrs] = useState({
    checkin: startDate || _defaultStart,
    checkout: endDate || _defaultEnd,
    nquartos: numQuartos,
    nviajantes: numViajantes
  });

  useEffect(() => {
    onSearchChange(searchAttributes);
  }, [searchAttributes, onSearchChange]);

  return (
    <div className={styles.RoomDates}>
      <Portal
        open={openSearchCount}
        parent={`.${styles.RoomDatesCount}`}
      >
        <div className={styles.RoomDatesCountPanel}>
          <div className={styles.RoomDatesCountItem}>
            <button
              type="button"
              onClick={() => {
                numQuartos > 1 && setNumQuartos(numQuartos - 1);
              }}
            >
              <SimpleLineIcon icon="minus" />
            </button>
            <span>{numQuartos}</span>
            <button
              type="button"
              onClick={() => {
                numQuartos < 10 && setNumQuartos(numQuartos + 1);
              }}
            >
              <SimpleLineIcon icon="plus" />
            </button>
          </div>
          <div className={styles.RoomDatesCountItem}>
            <button
              type="button"
              onClick={() => {
                numViajantes > 1 && setNumViajantes(numViajantes - 1);
              }}
            >
              <SimpleLineIcon icon="minus" />
            </button>
            <span>{numViajantes}</span>
            <button
              type="button"
              onClick={() => {
                numViajantes < 10 && setNumViajantes(numViajantes + 1);
              }}
            >
              <SimpleLineIcon icon="plus" />
            </button>
          </div>
          <div className={styles.RoomDatesCountConfirm}>
            <button
              type="button"
              className="AppButton"
              onClick={() => {
                setSearchAttrs({
                  ...searchAttributes,
                  nquartos: numQuartos,
                  nviajantes: numViajantes
                });
                setSearchCount(false);
              }}
            >Confirmar</button>
          </div>
        </div>
      </Portal>
      <DateRangePicker
        startDatePlaceholderText="Chegada"
        endDatePlaceholderText="Saída"
        startDateAriaLabel="Chegada"
        endDateAriaLabel="Saída"
        startDateId="checkin"
        endDateId="checkout"
        startDate={startDate}
        endDate={endDate}
        displayFormat="DD/MM/yyyy"
        onDatesChange={({ startDate: s, endDate: e }) => {
          setStartDate(s);
          setEndDate(e);
          const formatedStart = dateFormat(s || _defaultStart, "Y-MM-dd");
          const formatedEnd = dateFormat(e || _defaultEnd, "Y-MM-dd");

          setSearchAttrs({
            ...searchAttributes,
            checkin: formatedStart,
            checkout: formatedEnd
          });
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        withPortal={true}
      />
      <div
        className={styles.RoomDatesWrapper}
      >
        <div className={styles.RoomDatesDates}>
          <button
            type="button"
            className={`${styles.RoomDatesBtn} ${styles.RoomDatesCheckin}`}
            onClick={() => setFocusedInput("startDate")}
          >
            <label htmlFor="check-in-date">
              <SimpleLineIcon icon="calendar" />
            Check-in
            </label>
            <div id="check-in-date" className={styles.RoomDatesDisplayDate}>
              {dateFormat(startDate || _defaultStart)}
            </div>
          </button>
          <span className="RoomDates-sep"></span>
          <button
            type="button"
            className={`${styles.RoomDatesBtn} ${styles.RoomDatesCheckout}`}
            onClick={() => setFocusedInput("endDate")}
          >
            <label htmlFor="check-out-date">
              <SimpleLineIcon icon="calendar" />
            Check-out
            </label>
            <div id="check-out-date" className={styles.RoomDatesDisplayDate}>
              {dateFormat(endDate || _defaultEnd)}
            </div>
          </button>
          <div
            role="presentation"
            className={`${styles.RoomDatesBtn} ${styles.RoomDatesCount}`}
            onClick={() => {
              setSearchCount(true);
            }}
          >
            <div id="viajantes-count">
              <p>
                <span id="nquartos">{numQuartos}</span>
                <span>{countText(numQuartos, "Quarto", "Quartos")}</span>
              </p>
              <p>
                <span id="nviajantes">{numViajantes}</span>
                <span>{countText(numViajantes, "Viajante", "Viajantes")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
