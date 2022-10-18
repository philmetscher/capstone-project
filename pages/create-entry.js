import Head from "next/head";

import Header from "../components/Header";

export default function CreateEntry() {
  return (
    <>
      <Head>
        <title>Create new list-item</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>neuer Eintrag</Header>
      <main></main>
    </>
  );
}
