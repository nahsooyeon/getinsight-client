import React, { ReactElement, useEffect, useState } from 'react';
import { KeywordListElement } from '../interfaces/interfaces';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  resultData: KeywordListElement;
}

function DeviceGraph(props: Props): ReactElement {
  const { resultData } = props;
  const data = {
    options: {
      chart: {
        zoom: {
          enabled: false,
        }
      },
      labels: ['PC', 'Mobile'],

    },
    series: [
      resultData.monthlyPcQcCnt, resultData.monthlyMobileQcCnt
    ],



  };
  return <>
    <Chart options={data.options} type='pie' series={data.series} />
  </>;
}

export default DeviceGraph;
