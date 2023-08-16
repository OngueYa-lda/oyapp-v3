'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ActiveAnchorLink = props => {
  const {
    anchor,
    shadow,
    children,
    ...rest
  } = props;

  const router = useRouter();
  const [, hash] = router.asPath.split("#");

  const setActivelink = e => {
    const removeCurrent = () => {
      const current = 'a[data-active="true"]';
      const elem = document.querySelector(current);
      if (elem) elem.removeAttribute("data-active");
    };

    const smoothScroll = target => {
      if (target) {
        const _href = target.getAttribute("href");
        const elem = document.querySelector(_href);
        elem.scrollIntoView({
          behavior: "smooth"
        });
      }
    };

    const setActive = elem => {
      if (elem) elem.setAttribute("data-active", "true");
    };

    removeCurrent();

    if (e) {
      e.preventDefault();
      const target = e.target;

      if (!shadow) {
        setActive(target);
      } else {
        const selector = `a[href="${anchor}"]`;
        const actual = document.querySelector(selector);
        setActive(actual);
      }

      smoothScroll(target);
      return;
    }

    const selector = `a[href="#${hash}"]`;
    const elem = document.querySelector(selector);

    setActive(elem);
    smoothScroll(elem);
  };

  useEffect(() => {
    if (hash) {
      setActivelink();
    }
  });

  return (
    <Link
      href={anchor}
      onClick={setActivelink}
      {...rest}
    >
      {children}
    </Link>
  );
};
