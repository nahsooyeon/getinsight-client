import React, { ReactElement } from 'react';
import MainNav from '../components/mainnav';
import Link from 'next/link';

import Router, { useRouter } from 'next/router';

export default function Login(): ReactElement {
  return (
    <>
      <div className="logo-image">겟인사이트로고</div>
      <MainNav />

      <div className="login-page-view">
        <div className="login-container">
          <div className="intro-login">
            <div className="title-login">로그인</div>
            <div className="subtitle-login">환영합니다. <br /> 로그인을 기다리고 있습니다.</div>
          </div>
          <div className="group-login">
            <div className="input-group-login">
              <input className="input-email" placeholder="이메일 입력" type="text" />
              <input className="input-password" placeholder="비밀번호 입력" type="password" />
            </div>
            <div>비밀번호를 잊으셨나요?</div> <div><Link href="/signup"><a className="link-signup">회원가입</a></Link></div>
            <button className="btn-login">로그인하기</button>
          </div>

        </div>
      </div>
    </>
  );

};
