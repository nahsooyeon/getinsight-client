import React, { ReactElement } from 'react';

export default function Login(): ReactElement {
	return (
		<div className="login-page-view">
			<div className="logo-image"></div>
			<div>
				<label>ID </label><input className="input-email" placeholder="이메일 주소 입력" />
				<label>password</label> <input className="input-password" placeholder="비밀번호 입력" />
			</div>
		</div>
	);

};