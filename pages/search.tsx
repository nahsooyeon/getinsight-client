import React, { ReactElement, useRef, useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';

import api from "../commons/apiUtil";
import { KeywordBody, keywordGroups } from '../interfaces/interfaces';

import dummyResponse from "../dummyResult.json";
import dummyRequest from "../dummydata.json";


function Search(): ReactElement {
	/* 메인 검색어, 하위 검색어, 시작 날짜, 끝날짜, 시간 단위 */
	const [keyword, setKeyword] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [timeUnit, setTimeUnit] = useState('date');
	const [resultData, setresultData] = useState({});
	const keywordInput = useRef<HTMLInputElement>(null);

	/* useEffect(() => {
		setKeyword('');
	}, []); */


	/* 월간 검색량 요청 함수 */
	const searchData = async (data: KeywordBody) => {
		const result = await api({
			method: "post",
			url: "search",
			data
		});
		return result;
	};

	/* 검색어 클릭 함수*/
	const clickSearch = () => {
		searchData(dummyRequest);
	};

	return (
		<>
			<div>
				<div className="search-container">
					<h1>키워드 검색 서비스</h1>
					<input type="text" />
					<button type="button" onClick={() => {
						clickSearch();
					}}>Search</button>
					<div className="dates-wrapper group">
						<div className="field clearfix date-range-start date-wrapper">
							<div className="label">
								<label htmlFor="datepicker-start">Start:</label>
							</div>
							<div className="input">
								<input type="date" name="experience-start" id="datepicker-start" ref={keywordInput} className="input-text" placeholder="dd/mm/yyyy" />
							</div>
						</div>

						<div className="field clearfix date-range-start date-wrapper">
							<div className="label">
								<label htmlFor="datepicker-end">End:</label>
							</div>
							<div className="input">
								<input type="date" name="experience-end" id="datepicker-end" className="input-text" placeholder="dd/mm/yyyy" />
							</div>
						</div>
					</div>
					{Object.keys(resultData).length > 0 ? (
						<div className="keyword-result-view">키워드 검색 결과입니다.
						</div>
					) : (<>키워드와 검색 기간을 입력해주세요.</>)}
				</div>
			</div>
		</>
	);
}

export default Search;