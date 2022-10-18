import Head from "next/head";
import styled from "styled-components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>JustList</title>
        <meta name="description" content="JustList App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1>My App</h1>
      </Main>
    </div>
  );
}

const Main = styled.main`
  text-align: center;
`;
