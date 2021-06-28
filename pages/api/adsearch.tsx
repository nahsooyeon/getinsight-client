import axios from 'axios';
import { Request, Response } from 'express';
// import { adKeywordBody } from "../../interfaces";
import CryptoJS from "crypto-js";

import Logger from "../../commons/Logger";
import { log } from 'winston';

const api_url = "/keywordstool";
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

export default async function handler(req: Request, res: Response) {
  if (req.method === 'POST') {
    const result = await adKeywordSearch(req.body.keyword);
    Logger.info('logger test');
    res.status(200).json(result.data);
  } else {
    res.status(403).json({ success: false });
  }

}

const adKeywordSearch = async (data: string) => {
  let result;
  try {
    const response = await axios.get('https://api.naver.com/keywordstool?hintKeywords=' + encodeURI(data) + '&showDetail=1', {
      headers: headers,
    });
    result = response;
  } catch (error) {
    console.log(error);
  }
  return result;
};




