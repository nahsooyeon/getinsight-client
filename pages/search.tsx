import React, { ReactElement, useRef, useState, useEffect, useMemo } from 'react';
import ResultView from '../components/resultview';
// import "../styles/components/_datepicker.scss";
import Select from "react-select";
import Nav from "../components/nav";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from 'date-fns/locale';
registerLocale("ko", ko);

import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import range from "lodash/range";

import api from "../commons/apiUtil";
import { SearchBody, KeywordResult, KeywordListElement } from '../interfaces/interfaces';


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
  const [startDate, setStartDate] = useState<Date>(new Date(Now.getTime() - 24 * 60 * 60 * 1000 * 2));

  const [endDate, setEndDate] = useState<Date>(new Date(Now.getTime() - 24 * 60 * 60 * 1000));
  const [timeUnit, setTimeUnit] = useState('month');

  const [openData, setOpenData] = useState<KeywordResult>({});
  const [adData, setAdData] = useState<KeywordListElement[]>([]);

  const aMonthBtn = useRef<HTMLButtonElement>(null);
  const threeMonthBtn = useRef<HTMLButtonElement>(null);
  const aYearBtn = useRef<HTMLButtonElement>(null);
  const noneBtn = useRef<HTMLButtonElement>(null);
  const keywordInput = useRef<HTMLInputElement>(null);

  interface adKeywordBody {
    keyword: string;
  }

  /* 입력값 핸들러 함수 */
  const onInputKeywordHandler = (e: {
    target: { value: React.SetStateAction<string>; };
  }) => {
    setKeyword(e.target.value);

  };

  /* 키워드 입력 상태에서 엔터 클릭 시 검색 */
  const enterHandler = (e) => {
    if (e.key === 'Enter') {
      setKeyword(e.target.value);
      clickSearch();
    }

  };
  /* 날짜 정보 설정 함수 */
  const handleStartDateChange = (date: Date, _event: React.SyntheticEvent<any, Event>) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: Date, _event: React.SyntheticEvent<any, Event>) => {
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
  const searchData = async (data: SearchBody) => {
    const result = await api({
      method: "POST",
      url: "search",
      data
    });
    console.log(result.data.result);
    setOpenData(result.data.result);
  };

  /* 검색광고 api 요청 함수 */
  const adSearchData = async (data: adKeywordBody) => {
    const result = await api({
      method: "POST",
      url: "adsearch",
      data
    });
    console.log(result.data.result);

    setAdData(result.data.result.keywordList);
  };

  /* 검색어 클릭 함수*/
  const clickSearch = async () => {
    /* 한 정보라도 빠져있다면 에러 발생! */
    const requestData = {
      startDate: getFormatDate(startDate),
      endDate: getFormatDate(endDate),
      timeUnit: timeUnit,
      keywordGroups: [{
        groupName: keyword,
        keywords: [keyword]
      }]
    };
    await searchData(requestData);

    await adSearchData({ keyword: keyword });


    if (!keyword || !startDate || !endDate || !timeUnit) {
      alert("모든 정보를 입력해주세요");
    } else if (startDate > endDate) {
      alert("종료 일자는 시작 일자보다 빠를 수 없습니다.");
    } else if (endDate >= Now) {
      alert("키워드 트렌드 검색은 어제 일자까지 가능합니다.");
    }
  };
  /* 검색기간 자동 설정(1개월/3개월/1년 단위) */
  const clickTabs = ((e: string) => {
    if (e === 'aMonth') {
      let aMonthAgo = new Date(endDate.getTime() - 24 * 60 * 60 * 1000 * 30);
      setStartDate(aMonthAgo);
      aMonthBtn.current?.classList.add('active');
      threeMonthBtn.current?.classList.remove('active');
      aYearBtn.current?.classList.remove('active');
      noneBtn.current?.classList.remove('active');
    } else if (e === 'threeMonth') {
      let threeMonthAgo = new Date(endDate.getTime() - 24 * 60 * 60 * 1000 * 30 * 3);
      setStartDate(threeMonthAgo);
      threeMonthBtn.current?.classList.add('active');
      aMonthBtn.current?.classList.remove('active');
      aYearBtn.current?.classList.remove('active');
      noneBtn.current?.classList.remove('active');

    } else if (e === 'aYear') {
      let aYearAgo = new Date(endDate.getTime() - 24 * 60 * 60 * 1000 * 365);
      setStartDate(aYearAgo);
      aYearBtn.current?.classList.add('active');
      threeMonthBtn.current?.classList.remove('active');
      aMonthBtn.current?.classList.remove('active');
      noneBtn.current?.classList.remove('active');
    } else {
      noneBtn.current?.classList.add('active');
      setStartDate(endDate);
      aYearBtn.current?.classList.remove('active');
      threeMonthBtn.current?.classList.remove('active');
      aMonthBtn.current?.classList.remove('active');
    }
  });
  /* 검색기간 메뉴 설정 */
  const timeUnitOptions = useMemo(
    () => [{ value: "date", label: "일간" },
    { value: "week", label: "주간" },
    { value: "month", label: "월간" },
    ], []);

  const timeUnitStyles = useMemo(
    () => ({
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : '#4263EB',
        opacity: 0.8,
      }),
      control: (provided, state) => ({
        ...provided,
        width: 200,
        background: '#4263EB',
        color: 'white',
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
      }),

    }), []);


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
            <input type="text" className="keyword-input" ref={keywordInput} onChange={onInputKeywordHandler} placeholder={"키워드를 입력하세요"} onKeyPress={enterHandler} />
            <button type="button" className="search-btn" onClick={() => {
              clickSearch();
            }}>검색</button>
          </div>
          <div className="set-date-container">
            <div className="set-auto-period-container">
              <div className="set-period-btn-group">
                <button className="aMonth active" ref={aMonthBtn} onClick={() => clickTabs("aMonth")}  >1개월</button>
                <button className="threeMonth" ref={threeMonthBtn} onClick={() => clickTabs("threeMonth")} >3개월</button>
                <button className="aYear" ref={aYearBtn} onClick={() => clickTabs("aYear")} >1년</button>
                <button className="none" ref={noneBtn} onClick={() => clickTabs("none")} >직접 입력</button>
              </div>
            </div>
            <div className="set-period-container">
              <Select className="timeTab" options={timeUnitOptions} autosize={true} defaultValue={{ value: "date", label: "일간" }} styles={timeUnitStyles} onChange={(value) => { onInputTimeUnitHandler(value.value); }} />
            </div>
            <div className="calendar-container">
              <div className="start-date calendar">
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
              </div>
              <div className="end-date calendar">
                <DatePicker
                  maxDate={new Date()}
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
              </div>
            </div>

          </div>

          {Object.keys(openData).length > 0 && adData.length > 0 ? (
            <div className="keyword-result-view">
              <ResultView openData={openData} keyword={keyword} adData={adData} />
            </div>
          ) : (<div className="search-msg">네이버 통합검색에서 특정 검색어가 얼마나 많이 검색되었는지 확인해보세요.<br /></div>)}
        </div>
      </div>
    </>
  );
}

export default Search;

