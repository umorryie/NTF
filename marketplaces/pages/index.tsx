import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

interface MarketplacesColumns {
  marketplaces: Array<any>;
  columns: Array<string>;
}

interface MarketplaceObject {
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

function HomePage({ marketplaces, columns }: MarketplacesColumns) {
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

      <div>
        <h1 id="title">React Dynamic Table</h1>
        <table id="students">
          <tbody>
            <tr> {renderTableHeader(columns)}</tr>
            {renderTableData(marketplaces)}
          </tbody>
        </table>
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

const renderTableData = (arrayElements: Array<MarketplaceObject>) => {
  return arrayElements.map(
    (
      {
        _id,
        MarketPlace,
        Chain,
        Standard,
        Area,
        Operations,
        Service_Fee,
        Affiliate,
        Login_Type,
        Wallets,
        Compatibile,
        File_Type,
        Max_File_Size,
        External_Link,
        Royalties,
        Royalties_Percentage,
        Split_Royalties,
        Number_of_Splits,
        YouTube,
        TikTok,
        Medium,
        Operating_Token,
      },
      index
    ) => {
      return (
        <tr key={index}>
          <td>{MarketPlace}</td>
          <td>{Chain}</td>
          <td>{Standard}</td>
          <td>{Area}</td>
          <td>{Operations}</td>
          <td>{Service_Fee}</td>
          <td>{Affiliate}</td>
          <td>{Login_Type}</td>
          <td>{Wallets}</td>
          <td>{Compatibile}</td>
          <td>{File_Type}</td>
          <td>{Max_File_Size}</td>
          <td>{External_Link}</td>
          <td>{Royalties}</td>
          <td>{Royalties_Percentage}</td>
          <td>{Split_Royalties}</td>
          <td>{Number_of_Splits}</td>
          <td>{YouTube}</td>
          <td>{TikTok}</td>
          <td>{Medium}</td>
          <td>{Operating_Token}</td>
        </tr>
      );
    }
  );
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

export default HomePage;
