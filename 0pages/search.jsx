import Head from "next/head";

import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/pages/Search.module.css";

// components
import {
  Nav,
  Footer,
  ResultCard,
  Empty
} from "../components";
import { apiFetch } from "../util/fetch";
import { countText } from "../util/helpers";

const Search = props => {
  const { data, cookies } = props;

  const [items] = useState(data.data);
  const resultCount = items?.length || 0;

  const router = useRouter();
  const {
    where
  } = router.query;

  let pageTitle = where || "";
  pageTitle += ` (${resultCount}) - Resultados de pesquisa - OngueYa`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Nav
        cookies={cookies}
        withTravelSearch
      />

      <main className={styles.Search}>
        {items && <>
          <p className={styles.SearchResultText}>
            <span>{resultCount}&nbsp;</span>
            <span>
              {countText(resultCount, "resultado", "resultados")}
            &nbsp;
            </span>
            <span>em {where}&nbsp;</span>
          </p>
          {resultCount > 0 && items.map((item, i) => <ResultCard
            key={`ResultCard-${i}`}
            item={item}
          />)}
        </>
        }
        {!items && <Empty text="Para onde vais?" />}
      </main>

      <Footer />
    </>
  );
};

export default Search;

export async function getServerSideProps(ctx) {
  const query = ctx.query;

  if (!query.where) {
    return {
      notFound: true
    };
  }

  const searchParams = new URLSearchParams(query);

  const res = await apiFetch(`/search?${searchParams.toString()}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  });

  const data = await res.json();

  return { props: { data } };
}
