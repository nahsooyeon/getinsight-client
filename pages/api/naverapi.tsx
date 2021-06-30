import axios from 'axios';
import { KeywordBody, KeywordResult } from '../../interfaces/interfaces';
import { Request, Response } from 'express';
import CryptoJS from "crypto-js";


/* API 요청 클래스*/

class ApiController {
  /* 데이터랩 데이터 요청 */
  static openApiRequest = async (req: Request, res: Response) => {
    const openAPIURL = "https://openapi.naver.com/v1/datalab/search";
    const openAPIheaders = {
      "X-Naver-Client-Id": process.env.CLIENT_ID,
      "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
      "Content-Type": "application/json",
    };
    const naverSearch = async (data: KeywordBody) => {
      // Logger.info(data);
      let result;
      try {
        const response = await axios.post(openAPIURL, JSON.stringify(data), { headers: openAPIheaders });
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
    if (req.method === 'POST') {
      // await headerChecker.check(req.headers)
      const result = await naverSearch(req.body);
      res.status(200).json(result);
    } else {
      res.status(403).json({ success: false });
    }
  };
  /* 검색광고 데이터 요청 */
  static AdsKeywordRequest = async (req: Request, res: Response) => {
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
    if (req.method === 'POST') {
      const result = await adKeywordSearch(req.body.keyword);
      res.status(200).json(result.data);

    } else {
      res.status(403).json({ success: false });
    }

  };
}

export default ApiController;
