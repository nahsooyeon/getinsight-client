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
    chart: {
      type: "pie",
    },
    options: {
      chart: {
        height: 500,
        zoom: {
          enabled: false,
        }
      },
      labels: ['PC', 'Mobile'],
      tooltip: {
        enabled: true,
        style: {
          fontSize: "15px",
          fontColor: "black",
        },
      },

    },
    series: [
      resultData.monthlyPcQcCnt, resultData.monthlyMobileQcCnt
    ],



  };
  return <>
    <Chart options={data.options} type='pie' series={data.series} width={400} />
  </>;
}

export default DeviceGraph;
