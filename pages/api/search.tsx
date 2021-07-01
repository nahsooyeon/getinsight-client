// import dayjs from 'dayjs';
import axios from 'axios';
import { KeywordBody, KeywordResult } from '../../interfaces/interfaces';
import { Request, Response } from 'express';
// import Logger from "../../commons/Logger";
// import { headerChecker } from "headerChecker";

export default async function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    // await headerChecker.check(req.headers)
    const result = await naverSearch(req.body);
    res.status(200).json(result);
  } else {
    res.status(403).json({ success: false });
  }
}


/**  TODO: response interface 만들기
const resData = {
  d: [12, 3, 4, 5]
};
const successRes = {
  status: { success: true, timestamp: dayjs().unix(), error_code: 200, error_message: "" },
  data: resData
};

const errorRes = {
  status: { success: false, timestamp: dayjs().unix(), error_code: 404, error_message: "에러입니다." },
  data: resData
};
*/

const api_url = "https://openapi.naver.com/v1/datalab/search";

const headers = {
  "X-Naver-Client-Id": process.env.CLIENT_ID,
  "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
  "Content-Type": "application/json",
};

const naverSearch = async (data: KeywordBody) => {
  // Logger.info(data);

  let result;
  try {
    const response = await axios.post(api_url, JSON.stringify(data), { headers: headers });
    // const response = await axios({
    // 	baseURL: baseUri,
    // 	url: api_url,
    // 	data,
    // 	headers,
    // });
    result = response.data;
  } catch (error) {

    console.error(error);
  }
  return result;
};


