import React, { ReactElement, useRef, useState, useEffect, useMemo } from 'react';
import OpenDataGraph from "../components/opendatagraph";
import AdDataGraph from "../components/addatagraph";
import DeviceGraph from "../components/devicegraph";
import { KeywordListElement, KeywordResult } from '../interfaces/interfaces';

interface Props {
  openData: KeywordResult;
  keyword: string;
  adData: KeywordListElement[];
}

function ResultView(props: Props): ReactElement {
  const { openData, adData, keyword } = props;
  console.log(adData[0]);


  return (<>
    <div className="">
      최근 한 달동안 키워드 {adData[0].relKeyword}의 네이버 검색 결과입니다.
      <div className="monthlyQcCnt">
        월간 검색량은 {adData[0].monthlyPcQcCnt + adData[0].monthlyMobileQcCnt} 입니다.
        <DeviceGraph resultData={adData[0]} />

      </div>
      <div className="relKeywords">인기 연관 검색어 TOP 20</div>


    </div>
    <OpenDataGraph resultData={openData} />
    <AdDataGraph resultData={adData} />

  </>);

};

export default ResultView;
