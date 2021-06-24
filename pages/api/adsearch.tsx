import axios from 'axios';
import { Request, Response } from 'express';
// import { adKeywordBody } from "../../interfaces";
import CryptoJS from "crypto-js";








const api_url = "/ncc/managedKeyword";
const method = "GET";
const timestamp = Date.now() + '';
const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, process.env.NAVER_SERACHAD_SECRET);
hmac.update(timestamp + '.' + method + '.' + api_url);
let hash = hmac.finalize();
hash.toString(CryptoJS.enc.Base64);
const headers = {
  'X-timestamp': timestamp,
  'X-API-KEY': process.env.NAVER_SEARCHAD_ACCESS,
  'X-API-SECRET': process.env.NAVER_SERACHAD_SECRET,
  'X-CUSTOMER': process.env.NAVER_SERACHAD_ID,
  'X-Signature': hash.toString(CryptoJS.enc.Base64),


};

const dummy = '운동화';

export default async function handler(req: Request, res: Response) {
  // if (req.method === 'GET') {
  //   const result = await adKeywordSearch('운동화');
  //   res.status(200).json(result);
  // } else {
  //   res.status(403).json({ success: false });
  // }
  const result = await adKeywordSearch(encodeURI('운동화'));
  console.log(result);
  res.status(200).json(result);
}



const adKeywordSearch = async (data: string) => {
  let result;
  try {
    const response = await axios.get(`https://api.naver.com/ncc/managedKeyword?${data}`, { headers: headers });
    console.log(response);
    result = response;
  } catch (error) {
    console.log(error);
  }
  return result;

};
