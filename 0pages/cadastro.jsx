import Head from "next/head";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/pages/Entrar.module.css";

// components
import { Footer, Input, Logo } from "../components";
import { clientAuthFetch } from "../util/fetch";

const config = {
  authTokenKey: "oy-u-tok",
  dashboard: "/",
  path: "/"
};

function onSubmit(opts) {
  const {
    cookies,
    router,
    credentials,
    setServerErr
  } = opts;

  return e => {
    e.preventDefault();
    e.stopPropagation();

    for (const k in credentials) {
      if (credentials[k] === void 0) {
        document.getElementById(`entrar-${k}`)?.focus();
        return;
      }
    }

    const data = {
      callbackUrl: router.query.cburl || "/",
      credentials: {
        ...credentials,
        senha: Buffer.from(credentials.senha)
      }
    };

    clientAuthFetch("/signup?ctx=usuarios", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(async res => {
        const r = await res.json();
        if (r.dne) {
          const err = new Error(r);
          err.name = "USER_DNE";
          throw err;
        }

        cookies.set(config.authTokenKey, { path: config.path, maxAge: 604800 });
        router.push(config.dashboard);
      })
      .catch(() => {
        setServerErr(true);
      });
  };
}

const Cadastro = props => {
  const { cookies } = props;
  const [credentials, setCredentials] = useState({
    nome: "",
    username: "",
    email: "",
    senha: "",
    lembrar: false
  });

  const router = useRouter();
  const [serverErr, setServerErr] = useState(false);

  useEffect(() => {
    const data = cookies.get(config.authTokenKey);
    if (data) {
      router.push(config.dashboard);
    }
  }, [cookies, router]);

  return (
    <div className="FullWidthPage PageShadeBg">
      <Head>
        <title>Cadastro - OngueYa</title>
      </Head>

      <div className={styles.EntrarForm}>
        <div className={styles.EntrarLogo}>
          <Link href="/">
            <a><Logo /></a>
          </Link>
        </div>

        <div className={styles.EntrarFormSignup}>
          <span>Já tens uma conta?</span>
          <Link href="/login" >
            <a aria-label="Entrar na conta" title="Login">Login</a>
          </Link>
        </div>

        {serverErr && <p>
          Erro 500: Algo falhou no servidor
        </p>}

        <form
          action=""
          onSubmit={onSubmit({
            cookies,
            router,
            credentials,
            setServerErr
          })}
        >
          <div className={styles.EntrarFormItem}>
            <Input
              id="entrar-nome"
              type="text"
              label="Nome"
              placeholder="Primeiro nome"
              onInput={e => {
                const value = e.target.value;
                setCredentials({ ...credentials, nome: value });
              }}
            />
          </div>

          <div className={styles.EntrarFormItem}>
            <Input
              id="entrar-username"
              type="text"
              label="Nome de usuário"
              placeholder="Apelido para à plataforma"
              onInput={e => {
                const value = e.target.value;
                setCredentials({ ...credentials, username: value });
              }}
            />
          </div>

          <div className={styles.EntrarFormItem}>
            <Input
              id="entrar-email"
              type="text"
              label="Email"
              placeholder="Conta de email válida"
              onInput={e => {
                const value = e.target.value;
                setCredentials({ ...credentials, email: value });
              }}
            />
          </div>

          <div className={styles.EntrarFormItem}>
            <Input
              id="entrar-senha"
              type="password"
              placeholder="Senha"
              onInput={e => {
                const value = e.target.value;
                setCredentials({ ...credentials, senha: value });
              }}
            />
          </div>

          <button
            type="submit"
            className="AppButton"
          >
          Cadastrar
          </button>
        </form>

        <div className={styles.EntrarFormFooter}>
          <Footer.Copy />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
