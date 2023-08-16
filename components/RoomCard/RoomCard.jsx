"use client"

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import styles from "./RoomCard.module.css";

import {
  safeValue as val,
  classNameBuilder,
  readablePrice
} from "../../util/helpers.js";

// components
import {
  SimpleLineIcon,
  Comodidade
} from "../../components";
import { dateFormat, daysFromToday, getDateDiff, today } from "../../util/dates";

export function RoomCard(props) {
  const { data } = props;

  const quarto = data.quarto;
  const { checkin, checkout } = data.select;

  const imagens = val(quarto, "imagens");
  const imageCount = imagens?.length || 0;

  const options = val(quarto, "options.data", []);
  const tiposDeCama = val(quarto, "tiposDeCama", []);
  const camasCount = val(quarto, "cama", 1);
  const capacidadeCount = val(quarto, "capacidade", 1);
  const optionsCount = options.length;

  const urlParams = option => new URLSearchParams({
    qname: quarto.name.replace(/\s/g, ""),
    option: option.option,
    unitKind: data.unitKind,
    unit: data.unit,
    ...data.select,
    checkin: dateFormat(checkin, "Y-MM-dd"),
    checkout: dateFormat(checkout, "Y-MM-dd")
  });

  const hasReembolso = useMemo(() => {
    const _checkin = new Date(checkin);

    // tempo suficiente para reembolso
    // depois deste numero de dias
    const reembolsoDiff = 7;
    const diff = getDateDiff(_checkin, today());

    return diff > reembolsoDiff;
  }, [checkin]);

  const dataDeReembolso = useCallback(() => {
    // conside a disponibilidade do quarto definida pelo hotel
    // option.disponibilidade
    const reembolsoDiff = 7;
    const daysFromNow = daysFromToday(reembolsoDiff);

    return dateFormat(daysFromNow, "dd MMM Y");
  }, []);

  return (
    <div className={styles.RoomCard}>
      <div className={styles.RoomCardHeader}>
        {imageCount > 0 && <section className={styles.RoomCardImages}>
          {imagens.map((img, i) =>
            <div key={`ITEM-IMAGES${i}`} className={styles.RoomCardImage}>
              <Image
                src={img}
                alt="Foto do Quarto"
                layout="fill"
              />
            </div>
          )}
        </section>
        }
        <section className={styles.RoomCardDetails}>
          <h1 className={styles.RoomCardName}>
            {quarto.name}
          </h1>
          {quarto.tamanho
            && <p>
              <SimpleLineIcon icon="frame" />
              <span>{quarto.tamanho} m²</span>
            </p>
          }
          <p className={styles.RoomCardTipoCama}>
            <SimpleLineIcon icon={camasCount > 1 ? "people" : "user"} />
            {camasCount} {camasCount > 1 ? "camas" : "cama"} 
          </p>

          <p className={styles.RoomCardTipoCama}>
            <SimpleLineIcon icon={capacidadeCount > 1 ? "people" : "user"} />
            {capacidadeCount} {capacidadeCount > 1 ? "pessoas" : "pessoa"} 
          </p>
          
          {tiposDeCama.map((cama, i) =>
            <p
              key={`QUARTO-TIPOS-DE-CAMA${i}`}
              className={styles.RoomCardTipoCama}
            >cama: {cama}</p>
          )}
        </section>
      </div>
      <div className={styles.RoomCardBody}>
        {options.map((option, i) => {
          const comodidades = val(option, "comodidades", {});

          return (
            <div
              key={`QUARTO-OPTION${i}`}
              className={classNameBuilder({
                [styles.RoomCardOption]: optionsCount > 1,
                [styles.RoomCardOptionBorderLess]: optionsCount === 1
              })}
            >
              {optionsCount > 1 && <p className={styles.RoomCardOptionText}>
                Opção {option.option}
              </p>
              }
              <div className={classNameBuilder({
                [styles.RoomCardOptionGrid]: optionsCount > 1
              })}>
                <div className={styles.RoomCardComodidades}>
                  <div
                    className={styles.RoomCardReembolso}
                  >
                    <Comodidade
                      className={`${styles.RoomCardComodidade} ellipsis`}
                      state={hasReembolso}
                      icon="info"
                      label="Reembolso"
                      offTitle="Sem reembolso"
                      onTitle="Reembolso disponível"
                    />
                    {hasReembolso
                      && <div className={styles.RoomCardDisponibilidade}>
                        <p>
                          Pode cancelar ou mudar a data de checkin antes de {dataDeReembolso()}
                        </p>
                      </div>
                    }
                    {!hasReembolso
                      && <div className={styles.RoomCardDisponibilidade}>
                        <p>
                          <span>
                            <Link href="#cancelamento">
                              <a className="AppButtonLink">&nbsp;&para;&nbsp;</a>
                            </Link>
                          </span>
                          Sem reembolso disponível antes da data de check-in
                        </p>
                      </div>
                    }
                  </div>
                  <Comodidade
                    className={`${styles.RoomCardComodidade} ellipsis`}
                    state={comodidades.alimentacao.breakfast}
                    icon="cup"
                    label="Pequeno almoço"
                  />
                  <Comodidade
                    className={`${styles.RoomCardComodidade} ellipsis`}
                    state={comodidades.internet.wifi}
                    icon="feed"
                    label="Wi-Fi disponível no quarto"
                  />
                </div>
                <div className={classNameBuilder({
                  [styles.RoomCardPrecoWrap]: optionsCount > 1,
                  [styles.RoomCardPrecoWrapLeftAlign]: optionsCount === 1
                })}>
                  <h3 className={styles.RoomCardPreco}>
                    <span className="KwanzaCurrencySymbol">
                      {val(option, "preco.moeda")}
                    </span>
                    {readablePrice(val(option, "preco.fixo"))}
                  </h3>
                  <Link href={`/reservar/${quarto.hotel}?${urlParams(option)}`}>
                    <a className="AppButton">Reservar</a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })
        }
      </div>
    </div>
  );
}
