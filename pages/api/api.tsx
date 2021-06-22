import { KeywordBody } from "../../interfaces/interfaces";
import * as dotenv from 'dotenv';
import api from "../../commons/apiUtil";
import { Request, Response } from 'express';
dotenv.config();

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const clientSECRET = process.env.CLIENT_SECRET;
const clientID = process.env.CLIENT_ID;
const api_url = "https://openapi.naver.com/v1/datalab/search";

const headers = {
  "X-Naver-Client-Id": clientID,
  "X-Naver-Client-Secret": clientSECRET,
  "Content-Type": "application/json",
};

export const getKeywordData = (data: KeywordBody) => {
  console.log(data);
  console.log('서버에 전송 요청 시도');
  return api.post('/search/keyword', data);
};


/* export const start = (req: Request, res: Response) => {
  console.log('hi');
  res.status(200).json({ name: 'John Doe' });
};
 */