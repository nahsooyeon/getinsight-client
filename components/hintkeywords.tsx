import React, { ReactElement, useEffect, useState } from 'react';
import { KeywordListElement } from '../interfaces/interfaces';


interface Props {
  adData: KeywordListElement[];
}

function HintKeywordsTable(props: Props) {
  const { adData } = props;

  const topData = adData.map((el) => ({
    relKeyword: el.relKeyword,
    monthlyPcQcCnt: el.monthlyPcQcCnt,
    monthlyMobileQcCnt: el.monthlyMobileQcCnt,
    monthlyTotalPcQcCnt: el.monthlyPcQcCnt + el.monthlyMobileQcCnt
  })).sort((a, b) => {
    return a.monthlyTotalPcQcCnt > b.monthlyTotalPcQcCnt ? -1 : a.monthlyTotalPcQcCnt < b.monthlyTotalPcQcCnt ? 1 : 0;
  });
  topData.splice(20);
  const columns = ['연관 키워드', '월간 검색량(PC)', '월간 검색량(Mobile)', '월간 검색량(전체)'];

  return <>
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {topData.map(({ relKeyword, monthlyPcQcCnt, monthlyMobileQcCnt, monthlyTotalPcQcCnt }) => (
          <tr key={relKeyword + monthlyPcQcCnt + monthlyMobileQcCnt + monthlyTotalPcQcCnt}>
            <td>{relKeyword}</td>
            <td>{monthlyPcQcCnt}</td>
            <td>{monthlyMobileQcCnt}</td>
            <td>{monthlyTotalPcQcCnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>;
};

export default HintKeywordsTable;
