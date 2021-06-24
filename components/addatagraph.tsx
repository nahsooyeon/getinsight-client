import React, { ReactElement, useEffect, useState } from 'react';
import { KeywordListElement } from '../interfaces/interfaces';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  resultData: KeywordListElement[];
}

function adDataGraph(props: Props): ReactElement {
  const { resultData } = props;
  const graphData = {};

  return (<>
    <div className="월간 검색량"></div>
  </>);
}

export default adDataGraph;
