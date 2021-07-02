import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Marketplace.module.css";
import { useEffect, useState } from "react";

const columnNumber = 7;

interface IMarketplacesColumns {
  marketplaces: Array<IMarketplace>;
  columns: Array<string>;
}

interface IMarketplace {
  _id: string;
  MarketPlace: Array<string>;
  Chain: Array<string>;
  Standard: Array<string>;
  Area: Array<string>;
  Operations: Array<string>;
  Service_Fee: Array<string>;
  Affiliate: Array<string>;
  Login_Type: Array<string>;
  Wallets: Array<string>;
  Compatibile: Array<string>;
  File_Type: Array<string>;
  Max_File_Size: Array<string>;
  External_Link: Array<string>;
  Royalties: Array<string>;
  Royalties_Percentage: Array<string>;
  Split_Royalties: Array<string>;
  Number_of_Splits: Array<string>;
  YouTube: Array<string>;
  TikTok: Array<string>;
  Medium: Array<string>;
  Operating_Token: Array<string>;
  Link: Array<string>;
}

function MarketPlaces({ marketplaces, columns }: IMarketplacesColumns) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  });

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

      {width > 600 || true ? (
        <div className={styles["main-container"]}>
          <div className="table-container">
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>{renderTableHeader(columns)}</tr>
              </thead>
              <tbody>{renderShownAndHiddenTableData(marketplaces)}</tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// Get backend data
export async function getStaticProps() {
  const marketplaces = await fetch(
    determineUrl(process.env.URL, process.env.MARKETPLACES)
  );
  const columns = await fetch(
    determineUrl(process.env.URL, process.env.COLUMNS)
  );

  const marketplacesJSON = await marketplaces.json();
  const columnsJSON = await columns.json();

  return {
    props: {
      marketplaces: marketplacesJSON.marketplaces,
      columns: columnsJSON.columns[0].columns,
    },
  };
}

// Create table header
const renderTableHeader = (columns: Array<string>) => {
  let header = Object.values(columns);
  return header.map((key, index) => {
    if (index < columnNumber) {
      return (
        <th key={index} className={styles.th}>
          {key.toUpperCase()}
        </th>
      );
    }
    return null;
  });
};

// Render showing table body
const renderShownTableData = (arrayElements: Array<IMarketplace>) => {
  return arrayElements.map((marketplace: IMarketplace, index: number) => {
    return (
      <tr className={styles.tr} key={index}>
        {renderElementsByInterface(marketplace)}
      </tr>
    );
  });
};

// Render hidden table FULL CONTENT body
const renderFullTableData = (arrayElements: Array<IMarketplace>) => {
  return arrayElements.map((marketplace: IMarketplace, index: number) => {
    return (
      <tr className={styles["hidden-tr"]} key={`${index}${index}`}>
        {renderFullElementsByInterface(marketplace)}
      </tr>
    );
  });
};

// Determine url for backend calls
const determineUrl = (
  mainUrl: string | undefined,
  endpoint: string | undefined
) => {
  if (!mainUrl || !endpoint) {
    throw new Error("No url or endpoint specified");
  }
  return `${mainUrl}${endpoint}`;
};

// Render columns that derive from response interface IMarketplace
const renderElementsByInterface = (marketPlace: IMarketplace) => {
  const marketPlacesArray = Object.entries(marketPlace);
  const link = marketPlace.Link[0];

  return marketPlacesArray
    .filter((el) => el[0] !== "_id" && el[0] !== "Link")
    .map((el, index) => {
      if (index < columnNumber) {
        const allElements =
          el[1] instanceof Array
            ? el[1].map((stringElement: string, index: number) => {
                return (
                  <div
                    key={index}
                    className={` ${styles["content-flex-container"]} ${styles["content-border-background"]}`}
                  >
                    {stringElement}
                  </div>
                );
              })
            : null;
        switch (el[0]) {
          case "MarketPlace":
            return (
              <td
                className={`${styles["market-place-link"]} ${styles.td}`}
                key={index}
              >
                <a href={link} target="_blank">
                  {el[1][0]}
                </a>
              </td>
            );

          default:
            return (
              <td className={`${styles.td}`} key={index}>
                {allElements}
              </td>
            );
        }
      }
      return null;
    });
};

// Merge shown and hidden full table data
const renderShownAndHiddenTableData = (marketplaces: IMarketplace[]) => {
  let returningContent = [];
  const fullHiddenContent = renderFullTableData(marketplaces);
  const shownContent = renderShownTableData(marketplaces);

  for (let i = 0; i < marketplaces.length; i++) {
    returningContent.push(shownContent[i]);
    returningContent.push(fullHiddenContent[i]);
  }

  return returningContent;
};

// TODO
// Render full element for marketplace
const renderFullElementsByInterface = (marketplace: IMarketplace) => {
  return (
    <td colSpan={columnNumber}>
      <div className="full-element"></div>
    </td>
  );
};

export default MarketPlaces;
