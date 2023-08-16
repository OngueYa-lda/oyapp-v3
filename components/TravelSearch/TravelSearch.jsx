"use client"

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import "react-dates/initialize";
import {
  DateRangePicker
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import styles from "./TravelSearch.module.css";

// util
import {
  dateFormat,
  daysFromToday
} from "../../util/dates";
import { classNameBuilder, countText, safeFun } from "../../util/helpers";
// components
import { Portal, SimpleLineIcon } from "..";
// icons
import { Lupa } from "../../icons";
// helpers
import { filterProvinciaOnInput } from "./TravelSearch.helpers";

const provinciasDefaultList = [];

export function TravelSearch(props) {
  const {
    onSearchChange = () => {}
  } = props;

  const _onSearchChange = safeFun(onSearchChange);

  const router = useRouter();
  const {
    where,
    checkin,
    checkout,
    nquartos,
    nviajantes
  } = router.query;

  const defaultDestination = where || "";

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const _defaultStart = checkin || daysFromToday(7);
  const _defaultEnd = checkout || daysFromToday(8);

  const [openSearchCount, setSearchCount] = useState(false);
  const [numQuartos, setNumQuartos] = useState(Number(nquartos || 1));
  const [numViajantes, setNumViajantes] = useState(Number(nviajantes || 1));

  const [focusedInput, setFocusedInput] = useState(null);
  const [openProvincias, setOpenProvincias] = useState(false);
  const [provincias, setProvincias] = useState(provinciasDefaultList);
  const [loadingProvincias, setLoadingProvincias] = useState(true);

  const searchAttributes = {
    where,
    checkin,
    checkout,
    nquartos,
    nviajantes
  };

  const fetchData = useCallback(() => {
    fetch("/api/v1/provincias")
      .then(async res => {
        const data = await res.json();
        setProvincias(data);
        setLoadingProvincias(false);
      });
  }, []);

  return (
    <div className={styles.TravelSearch}>
      <Portal
        open={openProvincias}
        parent={`.${styles.TravelSearchWhere}`}
        onClick={() => {
          setOpenProvincias(false);
        }}
      >
        <div className={classNameBuilder({
          [styles.TravelSearchCities]: provincias.length
        }, "moz-app-scroll")}>
          {loadingProvincias && <p></p>}
          {provincias.map((p, key) => <div
            role="presentation"
            className={styles.TravelSearchCitiesItem}
            key={key}
            data-value={p.name}
            onClick={e => {
              const value = e.target.dataset.value || "";
              const elem = document.getElementById("where-input");
              if (elem) {
                elem.value = value;
              }

              _onSearchChange({
                ...searchAttributes,
                where: value
              });
            }}
          >
            <SimpleLineIcon icon="location-pin" />
            <span>{p.name}</span>
          </div>)}
        </div>
      </Portal>
      <Portal
        open={openSearchCount}
        parent={`.${styles.TravelSearchCount}`}
      >
        <div className={styles.TravelSearchCountPanel}>
          <div className={styles.TravelSearchCountItem}>
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
          <div className={styles.TravelSearchCountItem}>
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
          <div className={styles.TravelSearchCountConfirm}>
            <button
              type="button"
              className="AppButton"
              onClick={() => {
                setSearchCount(false);
                _onSearchChange({
                  ...searchAttributes,
                  nviajantes: numViajantes,
                  nquartos: numQuartos
                });
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

          _onSearchChange({
            ...searchAttributes,
            checkin: formatedStart,
            checkout: formatedEnd
          });
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        withPortal={true}
      />
      <form
        id="travelsearchform"
        action="/search"
        onSubmit={e => {
          const elem = document.getElementById("where-input");
          if (!elem.value) {
            e.preventDefault();
            elem.focus();
          }
        }}
      >
        <button
          type="button"
          className={`${styles.TravelSearchBtn} ${styles.TravelSearchWhere}`}
          onClick={() => {
            const elem = document.getElementById("where-input");
            elem && elem.focus();
          }}
        >
          <label htmlFor="where-input">
            <SimpleLineIcon icon="location-pin" />
          Para onde?
          </label>
          <input
            id="where-input"
            name="where"
            type="search"
            defaultValue={defaultDestination}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            placeholder="Província"
            onInput={e => {
              const input = e.target.value;
              const res = filterProvinciaOnInput(e)({ provincias });

              if (!input) setLoadingProvincias(true);
              if (input && res.length) setProvincias(res);
              if (!res.length) setLoadingProvincias(true);
            }}
            onFocus={() => {
              fetchData();
              setOpenProvincias(true);
            }}
            onKeyDown={e => {
              if (e.key === "Escape") {
                setOpenProvincias(false);
                e.target.blur();
              }
            }}
          />
        </button>
        <span className={styles.TravelSearchSep}></span>
        <div className={styles.TravelSearchDates}>
          <button
            type="button"
            className={`${styles.TravelSearchBtn} ${styles.TravelSearchCheckin}`}
            onClick={() => setFocusedInput("startDate")}
          >
            <label htmlFor="check-in-date">
              <SimpleLineIcon icon="calendar" />
            Check-in
            </label>
            <div id="check-in-date" className={styles.TravelSearchDisplayDate}>
              {dateFormat(startDate || _defaultStart)}
              <input
                id="checkin"
                name="checkin"
                type="hidden"
                value={dateFormat(startDate || _defaultStart, "Y-MM-dd")}
              />
            </div>
          </button>
          <span className="TravelSearch-sep"></span>
          <button
            type="button"
            className={`${styles.TravelSearchBtn} ${styles.TravelSearchCheckout}`}
            onClick={() => setFocusedInput("endDate")}
          >
            <label htmlFor="check-out-date">
              <SimpleLineIcon icon="calendar" />
            Check-out
            </label>
            <div id="check-out-date" className={styles.TravelSearchDisplayDate}>
              {dateFormat(endDate || _defaultEnd)}
              <input
                id="checkout"
                name="checkout"
                type="hidden"
                value={dateFormat(endDate || _defaultEnd, "Y-MM-dd")}
              />
            </div>
          </button>
          <div
            role="presentation"
            className={`${styles.TravelSearchBtn} ${styles.TravelSearchCount}`}
            onClick={() => {
              setSearchCount(true);
            }}
          >
            <div id="viajantes-count">
              <p>
                <span id="nquartos">{numQuartos}</span>
                <input
                  id="nquartos"
                  name="nquartos"
                  type="hidden"
                  value={numQuartos}
                />
                <span>{countText(numQuartos, "Quarto", "Quartos")}</span>
              </p>
              <p>
                <span id="nviajantes">{numViajantes}</span>
                <input
                  id="nviajantes"
                  name="nviajantes"
                  type="hidden"
                  value={numViajantes}
                />
                <span>{countText(numViajantes, "Viajante", "Viajantes")}</span>
              </p>
            </div>
          </div>
        </div>
        <button
          id="search-submit"
          type="submit"
          className={styles.TravelSearchSubmit}
          title="Pesquisar"
          aria-label="Pesquisar"
        >
          <span>Pesquisar</span>
          <Lupa />
        </button>
      </form>
    </div>
  );
}
