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
      legend: {
        show: true,
        position: "bottom"
      },
      responsive: [
        {
          breakpoint: 900,
          options: {
            chart: {
              width: "200px",
              height: "200px",
              type: "pie",
            },
          },
        },
        {
          breakpoint: 375,
          options: {
            chart: {
              width: "90px",
              height: "90px",
              type: "pie",
            },
          },
        },
      ],
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
