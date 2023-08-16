"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// style
import styles from "./Nav.module.css";
// util
import { toggleSideBarShow } from "../../util/browser";
import Menu from "../../util/menu.json";
import { classNameBuilder } from "../../util/helpers";
// components
import {
  TravelSearch,
  SimpleLineIcon,
  SideBar,
  Logo
} from "..";
// icons
import {
  Hamburger,
  Close
} from "../../icons";

const defaultCookieInterface = {
  get: () => {},
  remove: () => {}
};

export function Nav(props) {
  const {
    menu = [],
    onSearchChange,
    withTravelSearch = false,
    cookies = defaultCookieInterface
  } = props;

  const router = useRouter();

  const _menu = menu.length ? menu : Menu.menu;

  const [openIcon, setOpenIcon] = useState(true);
  const [session, setSession] = useState(null);
  const [loginState, setLoginState] = useState({
    login: "unknown"
  });

  const logout = () => {
    cookies.remove("oy-u-tok");
    setSession(null);
    setLoginState({
      login: "off"
    });
  };

  useEffect(() => {
    const data = cookies.get("oy-u-tok");
    if (!session && data) {
      setSession(data);
      setLoginState({
        login: "on"
      });
    }

    if (loginState.login === "off") {
      router.push("/");
    }
  }, [session, cookies, router, loginState]);

  return (
    <header className={classNameBuilder({
      [styles.Nav]: withTravelSearch,
      [styles.NavMini]: !withTravelSearch
    })}>
      <SideBar />
      <div className={classNameBuilder({
        [styles.NavWrap]: withTravelSearch,
        [styles.NavWrapMini]: !withTravelSearch
      })}>
        <div className={styles.NavLogo}>
          <Link href="/">
            <span><Logo /></span>
          </Link>
        </div>

        <nav className={styles.NavMenu}>
          <ul>
            {_menu.map((item, i) =>
              <li key={`MENU-ITEM${i}`}>
                <Link href={item.url}>
                  <span>
                    {item.text}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.NavRightmost}> 
          <div>
            <Link href="/parceiros">
              <span className={styles.NavLinkProperty}>
                Listar propriedade
              </span>
            </Link>
          </div>

          <div>
            {!session && <Link href="/login">
              <span className={styles.NavButton}>
                <SimpleLineIcon icon="user" />
                Login
              </span>
            </Link>
            }
            {session && <button
              onClick={() => {
                logout();
              }}
            >Sair</button>}
          </div>
          <div className={styles.NavHamburger}>
            <button
              id="Nav-hamburger-btn"
              onClick={() => {
                toggleSideBarShow();
                setOpenIcon(!openIcon);
              }}
            >
              {openIcon && <Hamburger />}
              {!openIcon && <Close />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
