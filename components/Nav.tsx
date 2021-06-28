import React, { ReactElement, useEffect, useState } from 'react';
import MagicLineMenu from 'react-magic-line-menu';
import Link from 'next/link';

const Nav = (props: any) => {
  let leftPos, newWidth, $magicLine;

  return (
    <div className="nav">
      <Link href="/search">
        <a>키워드 분석</a>
      </Link>
      <Link href="/shopping">
        <a>쇼핑 트렌드 분석</a>
      </Link>
    </div>);
};






export default Nav;
