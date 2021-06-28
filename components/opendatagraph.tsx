import React, { ReactElement, useEffect, useState } from 'react';
import { KeywordResult } from '../interfaces/interfaces';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


interface Props {
  resultData: KeywordResult;
}

function openDataGraph(props: Props): ReactElement {
  const { resultData } = props;
  const categoryArray = [];
  resultData.results[0].data.forEach((el) => categoryArray.push(el.period));
  const ratioArray = [];
  resultData.results[0].data.forEach((el) => ratioArray.push(Math.round(el.ratio)));
  const data = {
    options: {
      chart: {
        width: "300px",
        zoom: {
          enabled: false,
        }
      },
      xaxis: {
        categories: categoryArray,
        tickAmount: 10,
      },
      yaxis: {
        max: 100
      },

    },
    series: [
      {
        name: resultData.results[0].title,
        data: ratioArray
      }
    ]
  };

  return (
    <div className="line-graph-view">
      <Chart options={data.options} series={data.series} type="line" width="500" />
    </div>
  );
};

export default openDataGraph;
