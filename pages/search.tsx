import React, { ReactElement, useRef, useState, useEffect, useMemo } from 'react';
import OpenDataGraph from "../components/opendatagraph";
import AdDataGraph from "../components/addatagraph";
import ResultView from '../components/resultview';
import Select from "react-select";
import Nav from "../components/nav";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from 'date-fns/locale';
registerLocale("ko", ko);
import "react-datepicker/dist/react-datepicker.css";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import range from "lodash/range";

import api from "../commons/apiUtil";
import { KeywordBody, keywordGroups, KeywordResult, KeywordListElement } from '../interfaces/interfaces';
const Now = new Date();

function Search(): ReactElement {
  function getFormatDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }
  /* 메인 검색어, 하위 검색어, 시작 날짜, 끝날짜, 시간 단위 */
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [timeUnit, setTimeUnit] = useState('');
  const [requestData, setRequestData] = useState<KeywordBody>({});
  const [keywordGroup, setKeywordGroup] = useState<keywordGroups[]>([]);

  const [openData, setOpenData] = useState<KeywordResult>({});
  const [adData, setAdData] = useState<KeywordListElement[]>([]);
  const keywordInput = useRef<HTMLInputElement>(null);
  // const endDateInput = useRef<HTMLInputElement>(null);

  interface adKeywordBody {
    keyword: string;
  }

  useEffect(() => {

  }, []);

  /* 입력값 핸들러 함수 */
  const onInputKeywordHandler = (e: {
    target: { value: React.SetStateAction<string>; };
  }) => {
    setKeyword(e.target.value);
  };

  /* 날짜 정보 설정 함수 */

  const handleStartDateChange = (date: Date | null, event: React.SyntheticEvent<any, Event>) => {

    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null, event: React.SyntheticEvent<any, Event>) => {
    setEndDate(date);
  };

  const years = range(2006, getYear(new Date()) + 1, 1);
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ];


  /* 데이터랩 api 요청 함수 */
  const searchData = async (data: KeywordBody) => {
    const result = await api({
      method: "post",
      url: "search",
      data
    });
    setOpenData(result.data);

  };

  /* 검색광고 api 요청 함수 */
  const adSearchData = async (data: adKeywordBody) => {
    const result = await api({
      method: "post",
      url: "adsearch",
      data
    });
    setAdData(result.data.keywordList);

  };

  /* 검색어 클릭 함수*/
  const clickSearch = async () => {
    /* 한 정보라도 빠져있다면 에러 발생! */
    /*  */
    if (!keyword || !startDate || !endDate || !timeUnit) {
      alert("모든 정보를 입력해주세요");
    } else {
      setRequestData({
        startDate: getFormatDate(startDate),
        endDate: getFormatDate(endDate),
        timeUnit: timeUnit,
        keywordGroups: [{
          groupName: keyword,
          keywords: [keyword]
        }]

      });
      await adSearchData({ keyword: keyword });
      await searchData(requestData);
    }
  };

  /* 검색기간 메뉴 설정 */
  const timeUnitOptions = useMemo(
    () => [{ value: "date", label: "일간" },
    { value: "week", label: "주간" },
    { value: "month", label: "월간" },
    ], []);

  const onInputTimeUnitHandler = (value: string) => {
    setTimeUnit(value);
  };

  return (
    <>
      <div className="search-page-view">
        <Nav />
        <div className="search-container">
          <h1>키워드 검색 서비스</h1>
          <div className="search-input-bar">
            <input type="text" className="keyword-input" ref={keywordInput} onChange={onInputKeywordHandler} />
            <button type="button" className="search-btn" onClick={() => {
              clickSearch();
            }}>Search</button>
          </div>
          <Select options={timeUnitOptions} onChange={(value) => { onInputTimeUnitHandler(value.value); }} />
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {"<"}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(Number(value))}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {">"}
                </button>
              </div>
            )}

            selected={startDate}
            onChange={handleStartDateChange}
            locale="ko"
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {"<"}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(Number(value))}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {">"}
                </button>
              </div>
            )}
            selected={endDate}
            onChange={handleEndDateChange}
            locale="ko"
            dateFormat="yyyy-MM-dd"
          />
          {Object.keys(openData).length > 0 ? (
            <div className="keyword-result-view">
              <ResultView openData={openData} keyword={keyword} adData={adData} />
            </div>
          ) : (<>키워드와 검색 기간을 입력해주세요.</>)}
        </div>
      </div>
    </>
  );
}

export default Search;

