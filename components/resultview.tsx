import React, { ReactElement, useRef, useState, useEffect, useMemo } from 'react';
import OpenDataGraph from "../components/opendatagraph";
import AdDataGraph from "../components/addatagraph";
import DeviceGraph from "../components/devicegraph";
import HintKeywordsTable from "../components/hintkeywords";
import { KeywordListElement, KeywordResult } from '../interfaces/interfaces';

interface Props {
  openData: KeywordResult;
  keyword: string;
  adData: KeywordListElement[];
}

function ResultView(props: Props): ReactElement {
  const { openData, adData, keyword } = props;


  return (
    <div className="result-view-container">
      <div className="result-graph-container">
        <div className="relativeSearch">
          <OpenDataGraph resultData={openData} />
        </div>
        <div className="monthlyQcCnt">
          <DeviceGraph resultData={adData[0]} />
        </div>
      </div>
      <div className="hintKeywords">
        <div className="title">인기 연관 검색어 TOP 20</div>
        <div className="hint-keywords-table">
          <HintKeywordsTable adData={adData} />
          <AdDataGraph resultData={adData} />
        </div>
      </div>



    </div>


  );

};

export default ResultView;
