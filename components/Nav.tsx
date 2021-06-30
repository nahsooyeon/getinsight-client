import React, { ReactElement, useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import Router, { useRouter } from 'next/router';


const Nav = (): ReactElement => {
  const router = useRouter();
  const { pathname } = router;

  const searchBtn = useRef<HTMLDivElement>(null);
  const shoppingBtn = useRef<HTMLDivElement>(null);



  return (
    <div className="nav">

      <div className="menu-item" ref={searchBtn} >
        <Link href="/search" >
          <a className="tab-menu first">키워드 분석</a>
        </Link>
        {pathname === '/search' ? <div className="wee"></div> : <></>}
      </div>
      <div className="menu-item" ref={shoppingBtn}>
        <Link href="/shopping">
          <a className="tab-menu second" >쇼핑 트렌드</a>
        </Link>
        {pathname === '/shopping' ? <div className="wee"></div> : <></>}
      </div>
    </div>
  );

};






export default Nav;
