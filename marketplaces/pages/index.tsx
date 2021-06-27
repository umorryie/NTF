import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

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
}

function MarketPlaces({ marketplaces, columns }: IMarketplacesColumns) {
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

      <div className={styles["main-container"]}>
        <div className="table-container">
          <table>
            <tbody>
              <tr> {renderTableHeader(columns)}</tr>
              {renderTableData(marketplaces)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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

const renderTableHeader = (columns: Array<string>) => {
  let header = Object.values(columns);
  return header.map((key, index) => {
    return <th key={index}>{key.toUpperCase()}</th>;
  });
};

const renderTableData = (arrayElements: Array<IMarketplace>) => {
  return arrayElements.map((marketplace: IMarketplace, index: number) => {
    return <tr key={index}>{renderElementsByInterface(marketplace)}</tr>;
  });
};

const determineUrl = (
  mainUrl: string | undefined,
  endpoint: string | undefined
) => {
  if (!mainUrl || !endpoint) {
    throw new Error("No url or endpoint specified");
  }
  return `${mainUrl}${endpoint}`;
};

const renderElementsByInterface = (marketPlace: IMarketplace) => {
  const marketPlacesArray = Object.entries(marketPlace);

  return marketPlacesArray
    .filter((el) => el[0] !== "_id")
    .map((el, index) => {
      return <td key={index}>{el[1]}</td>;
    });
};

export default MarketPlaces;
