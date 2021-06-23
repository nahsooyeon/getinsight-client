import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

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

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/">Get-Insight</a>
        </h1>

        <div className={styles.grid}>
          <Link href="/search">
            <a className={styles.card}>
              <h2>키워드 검색량 분석 &rarr;</h2>
              <p>특정 키워드의 일간/주간/월간 검색량 추이를 분석하세요</p>
            </a>
          </Link>

          <Link href="/shopping">
            <a className={styles.card}>
              <h2>쇼핑 트렌드 분석 &rarr;</h2>
              <p>특정 카테고리의 인기검색어와 검색 트렌드를 분석하세요</p>
            </a>
          </Link>

        </div>
      </main>
    </div>
  );
}
