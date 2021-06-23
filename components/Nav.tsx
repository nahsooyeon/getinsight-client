import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';

const Nav = (props: any) => (
	<div className="nav">
		<Link href="/search">
			<a></a>
		</Link>

		<Link href="/shopping"><a></a></Link>
	</div>
);


export default Nav;