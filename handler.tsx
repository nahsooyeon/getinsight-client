import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
import { KeywordBody, keywordGroups } from "./interfaces/interfaces";

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

module.exports.searchKeyword = async (body: KeywordBody) => {
  return axios
    .post(api_url, JSON.stringify(body), {
      headers: headers,
    })
    .then((response) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          data: response.data.results,
        }),
      };
    })
    .catch((err) => console.log(err));
};
