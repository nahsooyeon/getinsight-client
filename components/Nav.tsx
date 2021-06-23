import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';

const Nav = (props: any) => (
  <div className="nav">
    <Link href="/search">
      <a>키워드 검색 서비스</a>
    </Link>
    <Link href="/shopping"><a>쇼핑 트렌드 분석 서비스</a></Link>
  </div>
);


export default Nav;
