import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import MainNav from "../components/mainnav";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const styles = require('../styles/Home.module.scss');

export default function Home(): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>겟인사이트 데모</title>
        <meta name="description" content="GetInsight Demo Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNav />

      <main className={styles.main}>
        <h3 className={styles.title}>
          <h3>Simplify your Business with us!</h3>        </h3>

        <div className="group-index-btn"> <button className="btn-trial">Start free trial</button>
          <button className="btn-introduction">Learn more</button></div>



        <div className={styles.grid}>

        </div>
      </main>
    </div>
  );
}
