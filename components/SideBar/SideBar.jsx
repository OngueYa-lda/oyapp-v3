import Link from "next/link";

// style
import styles from "./SideBar.module.css";

// util
import Menu from "../../util/menu.json";

// components
import {
  SimpleLineIcon,
  Logo
} from "..";
import { closeSidebar } from "../../util/browser";

export function SideBar() {
  return (
    <>
      <div id="SideBarShadow" className={styles.SideBarShadow}></div>
      <div id="SideBar" className={styles.SideBar}>
        <div className={styles.SideBarLogo}>
          <Link href="/">
            <span><Logo /></span>
          </Link>
        </div>
        <nav>
          <ul className={styles.menu}>
            {Menu.menu.map((item, i) =>
              <li key={`MENU-ITEM${i}`}>
                <Link href={item.url || ""}>
                  <span
                    onClick={() => {
                      closeSidebar();
                    }}
                  >
                    <SimpleLineIcon icon={item.icon} />
                    {item.text}
                  </span>
                </Link>
              </li>)}
          </ul>
          <div className={styles.enterBtns}>
            <Link href="/login">
              <span className={styles.SideBarEnter}>Login</span>
            </Link>
            <Link href="/cadastro">
              <span className={styles.SideBarEnter}>Cadastro</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
