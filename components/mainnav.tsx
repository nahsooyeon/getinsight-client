
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';


const MainNav = (): ReactElement => {
  const router = useRouter();
  const { pathname } = router;

  const introductionBtn = useRef<HTMLDivElement>(null);
  const analysisBtn = useRef<HTMLDivElement>(null);
  const campaignBtn = useRef<HTMLDivElement>(null);
  const signupBtn = useRef<HTMLDivElement>(null);

  const getFocusHandler = (target: String) => {
    if (target === 'introduction') {
      introductionBtn.current?.classList.add('active');
      analysisBtn.current?.classList.remove('active');
      campaignBtn.current?.classList.remove('active');
      signupBtn.current?.classList.remove('active');
    } else if (target === 'analysis') {
      analysisBtn.current.classList.add('active');
      introductionBtn.current?.classList.remove('active');
      campaignBtn.current?.classList.remove('active');
      signupBtn.current?.classList.remove('active');
      console.log(target);

    } else if (target === 'campaign') {
      campaignBtn.current?.classList.add('active');
      introductionBtn.current?.classList.remove('active');
      analysisBtn.current?.classList.remove('active');
      signupBtn.current?.classList.remove('active');
    } else {
      signupBtn.current?.classList.add('active');
      introductionBtn.current?.classList.remove('active');
      analysisBtn.current?.classList.remove('active');
      campaignBtn.current?.classList.remove('active');
    }
  };

  return (
    <div className="nav-main">
      <div className="menu-item" ref={introductionBtn} onClick={() => getFocusHandler("introduction")}>
        <Link href="/introduction" >
          <a className="tab-menu first">서비스 소개</a>
        </Link>
      </div>
      <div className="menu-item" ref={analysisBtn} onClick={() => getFocusHandler("analysis")}>
        <Link href="/analysis">
          <a className="tab-menu second" >분석</a>
        </Link>
      </div>
      <div className="menu-item" ref={campaignBtn} onClick={() => getFocusHandler("campaign")}>
        <Link href="/campaign">
          <a className="tab-menu third">서비스/캠페인 신청</a>
        </Link>
      </div>
      <div className="menu-item" ref={signupBtn} onClick={() => getFocusHandler("signup")}>
        <Link href="/signin">
          <a className="tab-menu fourth">회원가입/로그인</a>
        </Link>
      </div>
    </div>
  );

};






export default MainNav;
