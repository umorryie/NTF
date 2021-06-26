import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

function HomePage() {
  return (
    <div className={styles["full-page"]}>
      <Head>
        <title>NFT Marketplaces</title>
        <meta name="description" content="List of non-fungible token markets" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export default HomePage;
