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
function Shopping(): ReactElement {
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
  const [timeUnit, setTimeUnit] = useState('');


  const [openData, setOpenData] = useState<KeywordResult>({});
  const [adData, setAdData] = useState<KeywordListElement[]>([]);
  const keywordInput = useRef<HTMLInputElement>(null);

  const aMonthBtn = useRef<HTMLButtonElement>(null);
  const threeMonthBtn = useRef<HTMLButtonElement>(null);
  const aYearBtn = useRef<HTMLButtonElement>(null);
  const noneBtn = useRef<HTMLButtonElement>(null);

  const parentCategory = useRef<Select>(null);
  const childCategory = useRef<Select>(null);

  const [categoryValue, setCategoryValue] = useState('');


  interface adKeywordBody {
    keyword: string;
  }

  /* 입력값 핸들러 함수 */
  const onInputKeywordHandler = (e: {
    target: { value: React.SetStateAction<string>; };
  }) => {
    setKeyword(e.target.value);
  };

  const onParentValueHandler = (value: string) => {
    setCategoryValue(value);
  };

  const onChildValueHandler = (value: string) => {
    setCategoryValue(value);
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
    setOpenData(result.data.result);
  };

  /* 검색광고 api 요청 함수 */
  const adSearchData = async (data: adKeywordBody) => {
    const result = await api({
      method: "POST",
      url: "adsearch",
      data
    });
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


  const onInputTimeUnitHandler = (value: string) => {
    setTimeUnit(value);
  };

  /* 1차 카테고리 메뉴 설정 */
  const parentOptions = useMemo(
    () => [{ value: "50000000", label: "패션의류" },
    { value: "50000001", label: "패션잡화" },
    { value: "50000002", label: "화장품/미용" },
    { value: "50000003", label: "디지털/가전" },
    { value: "50000004", label: "가구/인테리어" },
    { value: "50000005", label: "패션의류" },
    { value: "50000006", label: "식품" },
    { value: "50000007", label: "스포츠/레저" },
    { value: "50000008", label: "생활/건강" },
    { value: "50000009", label: "여가/생활편의" },
    { value: "50000010", label: "패션잡화" },
    { value: "50000011", label: "면세점" }

    ], []);

  const childOptions =
    [
      { value: "50000167", label: "여성의류", link: "50000000" },
      { value: "50000168", label: "여성언더웨어/잠옷", link: "50000000" },
      { value: "50000169", label: "남성의류", link: "50000000" },
      { value: "50000170", label: "남성언더웨어/잠옷", link: "50000000" },

      { value: "50000173", label: "여성신발", link: "50000001" },
      { value: "50000174", label: "남성신발", link: "50000001" },
      { value: "50000175", label: "신발용품", link: "50000001" },
      { value: "50000176", label: "여성가방", link: "50000001" },
      { value: "50000177", label: "남성가방", link: "50000001" },
      { value: "50000178", label: "여행용가방/소품", link: "50000001" },
      { value: "50000179", label: "지갑", link: "50000001" },
      { value: "50000180", label: "벨트", link: "50000001" },
      { value: "50000181", label: "모자", link: "50000001" },
      { value: "50000182", label: "장갑", link: "50000001" },
      { value: "50000183", label: "양말", link: "50000001" },
      { value: "50000184", label: "선글라스/안경테", link: "50000001" },
      { value: "50000185", label: "헤어액세서리", link: "50000001" },
      { value: "50000186", label: "패션소품", link: "50000001" },
      { value: "50000187", label: "시계", link: "50000001" },
      { value: "50000188", label: "순금", link: "50000001" },
      { value: "50000189", label: "주얼리", link: "50000001" },

      { value: "50000190", label: "스킨케어", link: "50000002" },
      { value: "50000194", label: "베이스메이크업", link: "50000002" },
      { value: "50000195", label: "색조메이크업", link: "50000002" },
      { value: "50000192", label: "클렌징", link: "50000002" },
      { value: "50000193", label: "마스크/팩", link: "50000002" },
      { value: "50000191", label: "선케어", link: "50000002" },
      { value: "50000202", label: "남성화장품", link: "50000002" },
      { value: "50000200", label: "향수", link: "50000002" },
      { value: "50000197", label: "바디케어", link: "50000002" },
      { value: "50000198", label: "헤어케어", link: "50000002" },
      { value: "50000199", label: "헤어스타일링", link: "50000002" },
      { value: "50000196", label: "네일케어", link: "50000002" },
      { value: "50000201", label: "뷰티소품", link: "50000002" },
    ];





  return (
    <>
      <div className="shopping-page-view">
        <Nav />
        <div className="search-container">
          <h1>쇼핑 트렌드 분석 서비스</h1>
          <div className="search-input-bar">
            <input type="text" className="keyword-input" ref={keywordInput} onChange={onInputKeywordHandler} placeholder={"키워드를 입력하세요"} />
            <button type="button" className="search-btn" onClick={() => {
              clickSearch();
            }}>검색</button>
          </div>
          <div className="set-date-container">
            <div className="set-auto-period-container">
              <div className="set-period-btn-group">
                <button className="aMonth" ref={aMonthBtn} onClick={() => clickTabs("aMonth")} >1개월</button>
                <button className="threeMonth" ref={threeMonthBtn} onClick={() => clickTabs("threeMonth")} >3개월</button>
                <button className="aYear" ref={aYearBtn} onClick={() => clickTabs("aYear")} >1년</button>
                <button className="none" ref={noneBtn} onClick={() => clickTabs("none")} >직접 입력</button>
              </div>
              <div className="set-period-container">
                <Select className="timeTab" options={timeUnitOptions} autosize={true} onChange={(value) => { onInputTimeUnitHandler(value.value); }} />
              </div>
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
            <div className="category-container">
              <label>분야</label>
              <div className="category-group">
                <Select className="category-parent" width='200px' ref={parentCategory} options={parentOptions} placeholder="1분류" onChange={(value) => { onParentValueHandler(value.value); }}></Select>
                <Select className="category-child" width='200px' ref={childCategory} placeholder="2분류" onChange={(value) => { onChildValueHandler(value.value); }} > </Select>
              </div>
            </div>
          </div>

          {Object.keys(openData).length > 0 && adData.length > 0 ? (
            <div className="keyword-result-view">
              <ResultView openData={openData} keyword={keyword} adData={adData} />
            </div>
          ) : (<div className="search-msg">네이버 통합검색의 쇼핑 영역과 네이버쇼핑에서의 트렌드를 확인해보세요<br /></div>)}
        </div>
      </div>
    </>
  );
}

export default Shopping;

