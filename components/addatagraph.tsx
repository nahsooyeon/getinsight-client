import React, { ReactElement, useEffect, useState } from 'react';
import { KeywordListElement } from '../interfaces/interfaces';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  resultData: KeywordListElement[];
}

function adDataGraph(props: Props): ReactElement {
  const { resultData } = props;
  for (let i = 1; i < 11; i++) {
    resultData[i];
  }


  return (<>

    <div className="monthlyQcCnt">

    </div>
  </>);
}

export default adDataGraph;
