import React, { ReactElement, useRef, useState, useEffect, useMemo } from 'react';
import KeywordGraph from '../components/keywordgraph';
import Select from "react-select";
import Nav from "../components/nav";

import api from "../commons/apiUtil";
import { KeywordBody, keywordGroups, KeywordResult } from '../interfaces/interfaces';

import dummyResult from "../dummyResult.json";

function Search(): ReactElement {
  /* 메인 검색어, 하위 검색어, 시작 날짜, 끝날짜, 시간 단위 */
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeUnit, setTimeUnit] = useState('date');
  const [requestData, setRequestData] = useState<KeywordBody>({});
  const [keywordGroup, setKeywordGroup] = useState<keywordGroups[]>([]);

  const [resultData, setResultData] = useState<KeywordResult>({});
  const keywordInput = useRef<HTMLInputElement>(null);
  const startDateInput = useRef<HTMLInputElement>(null);
  const endDateInput = useRef<HTMLInputElement>(null);


  useEffect(() => {
  }, []);

  /* 입력값 핸들러 함수 */
  const onInputKeywordHandler = (e: {
    target: { value: React.SetStateAction<string>; };
  }) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  /* 날짜 정보 전달 함수 */
  const onInputDateHandler = (e: {
    target: { name: string, value: React.SetStateAction<string>; };
  }) => {
    if (e.target.name === 'start-date') {
      setStartDate(e.target.value);
      console.log('실행됨');
    } else {
      setEndDate(e.target.value);
      console.log('실행됨');
    }
  };


  /* 월간 검색량 요청 함수 */
  const searchData = async (data: KeywordBody) => {
    const result = await api({
      method: "post",
      url: "search",
      data
    });
    setResultData(result.data);

  };

  /* 검색어 클릭 함수*/
  const clickSearch = () => {
    console.log(requestData);
    /* 한 정보라도 빠져있다면 에러 발생! */
    /*  */
    setRequestData({
      startDate: startDate,
      endDate: endDate,
      timeUnit: timeUnit,
      keywordGroups: [{
        groupName: keyword,
        keywords: [keyword]
      }]

    });
    console.log(requestData);

    searchData(requestData);
  };

  /* 검색기간 메뉴 설정 */
  const timeUnitOptions = useMemo(
    () => [{ value: "date", label: "일간" },
    { value: "week", label: "주간" },
    { value: "month", label: "월간" }], []);

  const onInputTimeUnitHandler = (value) => {
    setTimeUnit(value);
  };


  return (
    <>
      <div>
        <Nav />
        <div className="search-container">
          <h1>키워드 검색 서비스</h1>
          <input type="text" className="keyword-input" ref={keywordInput} onChange={onInputKeywordHandler} />
          <button type="button" onClick={() => {
            clickSearch();
          }}>Search</button>
          <Select options={timeUnitOptions} onChange={(value) => { onInputTimeUnitHandler(value.value); }} />

          <div className="dates-wrapper group">
            <div className="field clearfix date-range-start date-wrapper">
              <div className="label">
                <label htmlFor="datepicker-start">Start:</label>
              </div>
              <div className="input">
                <input type="date" name="start-date" id="datepicker-start" ref={startDateInput} onChange={onInputDateHandler} className="input-text" placeholder="yyyy/mm/dd" />
              </div>
            </div>

            <div className="field clearfix date-range-start date-wrapper">
              <div className="label">
                <label htmlFor="datepicker-end">End:</label>
              </div>
              <div className="input">
                <input type="date" name="end-date" id="datepicker-end" ref={endDateInput} onChange={onInputDateHandler} className="input-text" placeholder="yyyy/mm/dd" />
              </div>
            </div>
          </div>
          {Object.keys(resultData).length > 0 ? (
            <div className="keyword-result-view">키워드 검색 결과입니다.
              <KeywordGraph resultData={resultData} />
            </div>
          ) : (<>키워드와 검색 기간을 입력해주세요.</>)}
        </div>
      </div>
    </>
  );
}

export default Search;
