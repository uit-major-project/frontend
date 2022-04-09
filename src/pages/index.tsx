import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Title</title>
        <meta name="description" content="Description of app comes here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Start
    </div>
  );
};

export default Home;
