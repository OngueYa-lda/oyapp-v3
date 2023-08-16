import Head from "next/head";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/pages/Entrar.module.css";

// util
import { clientAuthFetch } from "../util/fetch";

// components
import { Input, Footer, Logo } from "../components";

const config = {
  authTokenKey: "oy-u-tok",
  dashboard: "/dashboard",
  path: "/"
};

function onSubmit(opts) {
  const {
    credentials,
    router,
    cookies,
    setNotFound
  } = opts;

  return e => {
    e.preventDefault();
    e.stopPropagation();

    if (!credentials.email) {
      document.getElementById("entrar-email")?.focus();
      return;
    }

    if (!credentials.senha) {
      document.getElementById("entrar-senha")?.focus();
      return;
    }

    const data = {
      callbackUrl: router.query.cburl || config.path,
      credentials: {
        ...credentials,
        senha: Buffer.from(credentials.senha)
      }
    };

    clientAuthFetch("/signin?ctx=usuarios", {
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

        cookies.set(config.authTokenKey, r, { path: config.path, maxAge: 604800 });
        router.push(config.dashboard);
      })
      .catch(err => {
        if (err.name === "USER_DNE") {
          setNotFound(true);
        }
      });
  };
}

const Login = props => {
  const { cookies } = props;

  const router = useRouter();

  const [notFoundErr, setNotFound] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    senha: "",
    lembrar: false
  });

  useEffect(() => {
    const data = cookies.get(config.authTokenKey);
    if (data) {
      router.push(config.dashboard);
    }
  }, [cookies, router]);

  return (
    <div className="FullWidthPage PageShadeBg">
      <Head>
        <title>Login - OngueYa</title>
      </Head>

      <div className={styles.EntrarForm}>
        <div className={styles.EntrarLogo}>
          <Link href="/">
            <a><Logo /></a>
          </Link>
        </div>

        <div className={styles.EntrarFormSignup}>
          <span>Não tem uma conta?</span>
          <Link href="/cadastro">
            <a aria-label="Criar conta" title="Cadastro">Criar</a>
          </Link>
        </div>

        {notFoundErr && <p>
          Usuário não existe. Cria uma conta
        </p>}

        <form
          action=""
          onSubmit={onSubmit({
            credentials,
            router,
            cookies,
            setNotFound
          })}
        >
          <div className={styles.EntrarFormItem}>
            <Input
              id="entrar-email"
              type="text"
              label="Email"
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
              label="Senha"
              onInput={e => {
                const value = e.target.value;
                setCredentials({ ...credentials, senha: value });
              }}
            />
          </div>

          <div className={`${styles.EntrarFormItem} ${styles.EntrarFormRemember}`}>
            <Input
              type="checkbox"
              name="lembrar-senha"
              id="lembrar-senha"
              onInput={e => {
                const isChecked = e.target.checked;
                setCredentials({ ...credentials, lembrar: isChecked });
              }}
            />
            <label htmlFor="lembrar-senha">Lembrar senha</label>
          </div>

          <button
            className="AppButton"
            type="submit"
          >Entrar
          </button>
        </form>

        <div className={styles.EntrarFormFooter}>
          <p>
            <Link href="/">
              <a
                aria-label="Esqueci a senha"
                title="Recuperar a senha"
              >Esqueci a senha
              </a>
            </Link>
          </p>
          <Footer.Copy />
        </div>
      </div>
    </div>
  );
};

export default Login;
