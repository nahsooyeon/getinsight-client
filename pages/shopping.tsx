import React, { ReactElement, useState } from 'react';



function Shopping(): ReactElement {


	const [keyword, setKeyword] = useState('');
	const [keywordData, setKeywordData] = useState({});

	return (
		<div>
			<div className="Shopping-container">
				<h1>쇼핑 트렌드 분석 서비스</h1>
				<input type="text" />
				<button type="button">Search</button>

			</div>

		</div>
	);
}

export default Shopping;