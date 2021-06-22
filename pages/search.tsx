import React, { ReactElement, useRef, useState, useEffect } from 'react';
import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import ApexCharts from 'apexcharts';
import { KeywordBody, keywordGroups } from '../interfaces/interfaces';
import dummyResponse from "../dummyResult.json";
import dummyRequest from "../dummydata.json";
import searchKeyword from "../handler";
import { getKeywordData } from "./api/api";

dotenv.config();

function Search(): ReactElement {
	/* 메인 검색어, 하위 검색어, 시작 날짜, 끝날짜, 시간 단위 */
	const [keyword, setKeyword] = useState('운동화');
	const [startDate, setStartDate] = useState('2021-04-01');
	const [endDate, setEndDate] = useState('2021-04-30');
	const [timeUnit, setTimeUnit] = useState('date');
	const [resultData, setresultData] = useState({});
	const keywordInput = useRef<HTMLInputElement>(null);



	/* useEffect(() => {
		setKeyword('');
	}, []); */


	/* 월간 검색량 요청 함수 */
	/* const searchData = async () => {


			}; */


	/* 검색어 클릭 함수*/
	const clickSearch = () => {
		getKeywordData(dummyRequest);
		console.log('버튼눌림');

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