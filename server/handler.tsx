import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
import { KeywordBody, keywordGroups } from "../interfaces/interfaces";

export default (req, res) => {
  console.log('hi');
  res.status(200).json({ name: 'John Doe' });
};


const api_url = "https://openapi.naver.com/v1/datalab/search";
const clientSECRET = process.env.CLIENT_SECRET;
const clientID = process.env.CLIENT_ID;
/* const requestBody: KeywordBody = {
    "startDate": startDate,
    "endDate": endDate,
    "timeUnit": timeUnit,
    "keywordGroups": [{
      "groupName": keyword,
      "keywords": [keyword]
    }]
  }; */
const headers = {
  "X-Naver-Client-Id": clientID,
  "X-Naver-Client-Secret": clientSECRET,
  "Content-Type": "application/json",
};

module.exports.searchKeyword = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log('searchKeyword 실행');
  return axios
    .post(api_url, JSON.stringify(req.body), {
      headers: headers,
    })
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((err) => console.log(err));
};
