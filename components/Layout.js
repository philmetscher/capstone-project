import Head from "next/head";
import Header from "../../components/Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>JustList</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>{children}</Header>
    </>
  );
}
