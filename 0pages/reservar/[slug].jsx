import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/pages/Reservar.module.css";

// components
import { Footer, Input, Logo, Portal, SimpleLineIcon } from "../../components";
// util
import { dateFormat, today } from "../../util/dates";
import {
  safeValue as val,
  readablePrice,
  countText,
  removeCurrencySeparatorToNumber,
  addCurrencySeparatorToNumber,
  safeFun
} from "../../util/helpers";
import { apiFetch } from "../../util/fetch";
import { getPdfContent, savePdf, writeToPdf } from "../../util/pdf";
import Link from "next/link";

function _onSubmit(data) {
  return e => {
    e.preventDefault();
    e.stopPropagation();

    const userKeys = ["fname", "lname", "email", "phone"];
    for (const k of userKeys) {
      if (!data.user[k]) {
        document.getElementById(`user-${k}`)?.focus();
        return;
      }
    }

    const {
      state,
      checkin,
      checkout,
      hotel,
      user,
      dataReserva,
      codigoReserva
    } = data;

    const codigo = codigoReserva;
    const fullname = `${user.fname} ${user.lname}`;
    const rData = dateFormat(dataReserva, "dd/MM/Y");
    const _checkin = dateFormat(checkin, "dd/MM/Y");
    const _checkout = dateFormat(checkout, "dd/MM/Y");

    writeToPdf(`Confirmação da reserva para o/a Sr/a ${fullname}`, 7);
    writeToPdf("Detalhes da reserva", 10);
    writeToPdf(`${hotel.name}`, 13);
    writeToPdf(`${hotel.quarto}`, 15, 13);

    writeToPdf(`Data da Reserva: ${rData}`, 19, 12);
    writeToPdf(`Check-in: ${_checkin}`, 21, 12);
    writeToPdf(`Check-out: ${_checkout}`, 23, 12);
    writeToPdf(`Quartos: ${hotel.nquartos}`, 25, 12);
    writeToPdf(`Viajantes: ${hotel.nviajantes}`, 27, 12);
    writeToPdf(`Código da reserva: ${codigo}`, 29, 12);

    writeToPdf("Obs: Reserva efectuada a partir da plataforma Ongueya.com", 32, 12);

    state.setFormFilled(true);
    state.setNomeReserva(`${fullname}-${codigoReserva}-Ongueya-com`);
  };
}

const calcularPrecoFinal = values => {
  const {
    preco,
    quartos,
    duracao
  } = values;

  const res = preco * quartos * duracao;
  return res;
};

function SuccessModal(props) {
  const {
    open = false,
    user,
    onBaixarClick = () => {},
    onClick = () => {}
  } = props;

  return (
    <Portal
      open={open || false}
      onClick={onClick}
      shadow="#000000bf"
    >
      <div className={`Modal ${styles.SuccessModal}`}>
        <h2>Parabéns!</h2>
        <p>Um email foi enviado com os detalhes da reserva para {user.email}.</p>
        <hr />
        <div className={styles.SuccessModalBtns}>
          <button
            className="AppButtonLink"
            type="button"
            onClick={onBaixarClick}
          >
            Baixar o ficheiro da Reserva
          </button>
          <Link href="/">
            <a className="AppButtonLink">
            Ver mais ofertas
            </a>
          </Link>
        </div>
      </div>
    </Portal>
  );
}

function ReservaModal(props) {
  const {
    open = false,
    onClick = () => {},
    onGuestClick,
    done = () => {}
  } = props;

  return (
    <Portal
      open={open || false}
      onClick={onClick}
      shadow="#000000bf"
    >
      <div className={`Modal ${styles.ReservarModal}`}>
        <h2>Login</h2>
        <p className={styles.ReservarModalSm}>
          Faça login para terminar a reserva
        </p>
        <div className={styles.ReservarModalLogin}>
          <form action="">
            <Input label="Email" />
            <Input label="Senha" />
            <button
              className="AppButton"
              type="button"
              onClick={() => done()}
            >Entrar
            </button>
          </form>
        </div>
        <hr />
        <div className={styles.ReservarModalBtns}>
          <button
            className="AppButton"
            type="button"
            onClick={() => done()}
          >Cadastrar-se
          </button>
          <button
            className={`${styles.ReservarModalSm} AppButtonLink`}
            type="button"
            onClick={onGuestClick}
          >Continuar sem registro?
          </button>
        </div>
      </div>
    </Portal>
  );
}

const ReservarNotice = () => <div className={styles.ReservarNotice}>
  <span>Ao finalizar a reserva, automaticamente aceitas os nossos&nbsp;</span>
  <Link href="/termos">
    <a target="_blank">Termos de uso</a>
  </Link>
  <span>, e&nbsp;</span>
  <Link href="/privacidade">
    <a target="_blank">Política de privacidade</a>
  </Link>.
</div>;

const Reservar = props => {
  const router = useRouter();

  const {
    checkin,
    checkout,
    nquartos,
    nviajantes
  } = router.query;

  // cookies
  const { data } = props;

  const [payObj, setPayDone] = useState({
    type: "",
    done: false
  });

  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    phoneCodigo: "00244",
    pay: payObj
  });

  const [openModal, setOpenModal] = useState(false);
  const [finalizar, setFinalizar] = useState(false);
  const [isFormFilled, setFormFilled] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const dataReserva = today();
  const dataReservaDisplay = dateFormat(dataReserva, "dd MMM Y");

  const _checkin = dateFormat(checkin, "dd MMM Y");
  const _checkout = dateFormat(checkout, "dd MMM Y");

  const checkinNumber = parseInt(_checkin, 10);
  const checkoutNumber = parseInt(_checkout, 10);
  const duracaoCalc = checkoutNumber - checkinNumber;

  const duracao = duracaoCalc < 1 ? 1 : duracaoCalc;
  const duracaoDisplay = `${duracao} ${countText(duracao, "noite", "noites")}`;

  const hotelName = val(data, "unit.name");
  const hotelEndereco = val(data, "unit.endereco");
  const currencySymbol = val(data, "option.preco.moeda");
  const precoInicialStr = val(data, "option.preco.fixo");
  const reservaOpt = Number(val(data, "option.option"));

  const nq = Number(nquartos);
  const nv = Number(nviajantes);

  const precoNum = calcularPrecoFinal({
    preco: removeCurrencySeparatorToNumber(precoInicialStr),
    quartos: nq,
    duracao
  });

  const precoFinalStr = addCurrencySeparatorToNumber(precoNum);
  const reservarPrice = readablePrice(precoFinalStr);

  const codigoReserva = Date.now();
  const [nomeReserva, setNomeReserva] = useState(codigoReserva);

  const pagamentoClick = opcao => {
    const index = opcao - 1;
    const opcoes = ["MCX", "Cash ou Cartão"];
    const select = opcoes[index];

    setPayDone({
      type: select,
      done: true
    });
  };

  const processarReserva = (done = () => {}) => {
    if (!finalizar && isFormFilled) {
      setOpenModal(true);
    }

    if (isFormFilled) {
      safeFun(done)();
    }
  };

  const finalizarReserva = () => {
    if (finalizar && payObj.done) {
      setIsDone(true);

      if (!payObj.done) {
        document.getElementById("pay-button-mcx")?.focus();
        return;
      }

      const content = {
        nome: userData.fname,
        sobrenome: userData.lname,
        email: userData.email,
        phone: `${userData.phoneCodigo}${userData.phone}`,
        nomePdf: `${nomeReserva}.pdf`,
        attachment: getPdfContent(),
        reserva: {
          endereco: hotelEndereco,
          checkin: _checkin,
          checkout: _checkout,
          horas: data.unit.horas,
          data: dataReservaDisplay,
          name: hotelName,
          quarto: data.name,
          quartoOpt: reservaOpt,
          duracao: duracaoDisplay,
          nquartos: nq,
          codigo: codigoReserva,
          preco: {
            string: precoInicialStr,
            number: precoNum,
            currency: currencySymbol
          }
        }
      };

      // enviar email
      fetch("/api/v1/email", {
        method: "POST",
        body: JSON.stringify(content)
      }).catch(err => {
        throw err;
      });
    }
  };

  return (
    <div className="FullWidthPage PageShadeBg">
      <Head>
        <title>Reservar - OngueYa</title>
      </Head>

      <main className={styles.Reservar}>
        <div className={styles.ReservarHeader}>
          <Logo />
        </div>

        <ReservaModal
          open={openModal}
          onGuestClick={() => {
            setOpenModal(false);
            setFinalizar(true);
          }}
          done={() => {
            setOpenModal(false);
            setFinalizar(true);
          }}
        />

        <SuccessModal
          open={isDone}
          user={{
            ...userData
          }}
          onBaixarClick={() => {
            savePdf(nomeReserva);
            router.push("/");
          }}
        />

        <div className={styles.ReservarGrid}>
          <section>
            <div className={styles.ReservarInfoBox}>
              <h2 className={styles.ReservarUnitName}>
                {hotelName}
              </h2>
              <div className={styles.ReservarEndereco}>
                {hotelEndereco}
              </div>
              <div className={styles.ReservarQuarto}>
                {reservaOpt > 1 && <>
                  <span className={styles.ReservarTinyLabel}>
                    Opção {reservaOpt}
                  </span>
                  <span className="separator-dot">&nbsp;&#8226;&nbsp;</span>
                </>
                }
                <span>{data.name}</span>
              </div>
            </div>

            <div className={styles.ReservarInfoBox}>
              <p className={styles.ReservarDadosTitle}>
              Detalhes da reserva
              </p>
              <div className={styles.ReservarInfoDetails}>
                <p className={`${styles.ReservarLineGrid}`}>
                  <span>Data da Reserva</span>
                  <span>{dataReservaDisplay}</span>
                </p>
                <p className={`${styles.ReservarLineGrid}`}>
                  <span>Check-in</span>
                  <span>{_checkin}</span>
                </p>
                <p className={`${styles.ReservarLineGrid}`}>
                  <span>Check-out</span>
                  <span>{_checkout}</span>
                </p>
                <p className={`${styles.ReservarLineGrid}`}>
                  <span>Duração</span>
                  <span>{duracaoDisplay}</span>
                </p>
                <p className={`${styles.ReservarLineGrid}`}>
                  <span>Quartos</span>
                  <span>{nq}</span>
                </p>
                <p className={`${styles.ReservarLineGrid}`}>
                  <span>Viajantes</span>
                  <span>{nv}</span>
                </p>
              </div>
            </div>

            <div className={styles.ReservarInfoBox}>
              <p className={styles.ReservarDadosTitle}>
                Detalhes do preço
              </p>
              <div className={styles.ReservarInfoDetails}>
                <p className={`${styles.ReservarLineGrid}`}>
                  <span>Por noite</span>
                  <span>
                    <span className="KwanzaCurrencySymbol">
                      {currencySymbol}
                    </span>
                    {precoInicialStr}
                  </span>
                </p>
                <p className={`${styles.ReservarLineGrid}`}>
                  <span>Taxas</span>
                  <span>0%</span>
                </p>
              </div>
            </div>
            <div className={`${styles.ReservarLineGrid} ${styles.ReservarInfoPrice}`}>
              <p>Total</p>
              <p>
                <span className="KwanzaCurrencySymbol">
                  {currencySymbol}
                </span>
                {reservarPrice}
              </p>
            </div>
          </section>

          <section>
            <form
              onSubmit={_onSubmit({
                state: {
                  setFormFilled,
                  setNomeReserva
                },
                checkin,
                checkout,
                dataReserva,
                codigoReserva,
                hotel: {
                  name: hotelName,
                  quarto: data.name,
                  nviajantes: nv,
                  nquartos: nq,
                  preco: {
                    string: precoInicialStr,
                    number: precoNum,
                    currency: currencySymbol
                  }
                },
                user: userData
              })}
            >
              <div className={styles.ReservarInfoBox}>
                <p className={styles.ReservarDadosTitle}>
                  Dados pessoais
                </p>
                <div className={styles.ReservarInput}>
                  <Input
                    id="user-fname"
                    type="text"
                    label="Primeiro nome"
                    placeholder="Primeiro nome"
                    onInput={e => {
                      const value = e.target.value;
                      setUserData({ ...userData, fname: value });
                    }}
                  />
                  <Input
                    id="user-lname"
                    type="text"
                    label="Último nome"
                    placeholder="Último nome"
                    onInput={e => {
                      const value = e.target.value;
                      setUserData({ ...userData, lname: value });
                    }}
                  />
                  <Input
                    id="user-email"
                    type="email"
                    label="Endereço de e-mail"
                    placeholder="Endereço de e-mail"
                    onInput={e => {
                      const value = e.target.value;
                      setUserData({ ...userData, email: value });
                    }}
                  />
                  <Input
                    id="user-phone"
                    type="tel"
                    pattern="[0-9]{9}"
                    maxLength="9"
                    label="Número do telefone"
                    placeholder="Número do telefone"
                    onInput={e => {
                      const value = e.target.value;
                      setUserData({ ...userData, phone: value });
                    }}
                  />
                </div>
              </div>

              <div className={styles.ReservarInfoBox}>
                <p className={styles.ReservarDadosTitle}>
                  Pagamento (Seleccione <small>"No local"</small>)
                </p>
                <div className={styles.ReservarPayBox}>
                  <div>
                    <p className="green-label">
                      <SimpleLineIcon icon="credit-card" size="1.15em" />
                      Online
                    </p> 
                    <div>
                      <button
                        id="pay-button-mcx"
                        className={styles.PayButton}
                        type="submit"
                        disabled={payObj.done}
                        onClick={() => {
                          processarReserva(() => {
                            if (!payObj.done) {
                              pagamentoClick(1);
                            }
                          });
                        }}
                      >
                        <Image
                          src="/assets/imagens/payments/mcx.png"
                          alt="Multicaixa express logo"
                          width={60}
                          height={60}
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="green-label">
                      <SimpleLineIcon icon="credit-card" size="1.15em" />
                      No local
                    </p>
                    <p>
                      <button
                        id="pay-button-pp"
                        className={styles.PayButton}
                        type="submit"
                        disabled={payObj.done}
                        onClick={() => {
                          processarReserva(() => {
                            if (!payObj.done) {
                              pagamentoClick(2);
                            }
                          });
                        }}
                      >
                        <Image
                          src="/assets/imagens/payments/cashoy.png"
                          alt="Pagamento em cash logo"
                          width={60}
                          height={60}
                        />
                      </button>
                    </p>
                  </div>
                </div>
                <div className={styles.ReservarDadosBottom}>
                  {payObj.done
                    && <p>
                    Pagamento a efectuar via {payObj.type}
                    </p>
                  }
                  <ReservarNotice />
                  <button
                    className="AppButton"
                    type="submit"
                    onClick={() => {
                      processarReserva(() => {
                        finalizarReserva();
                      });
                    }}
                  >
                    {!finalizar && <span>Reservar</span>}
                    {finalizar && <span>Finalizar Reserva</span>}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

        <div className={styles.ReservarFooter}>
          <Footer.Copy />
          <div className={styles.ReservarTermos}>
            <Footer.Termos />
          </div>
        </div>
      </main>

    </div>
  );
};

export default Reservar;

export async function getServerSideProps(ctx) {
  const query = ctx.query;
  const searchParams = new URLSearchParams(query);
  const queryKeys = ["qname", "slug", "option", "unitKind", "unit"];

  for (const key of queryKeys) {
    if (!query[key]) {
      return {
        notFound: true
      };
    }
  }

  const res = await apiFetch(`/reservar?${searchParams.toString()}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  });

  const data = await res.json();
  return { props: { data } };
}
