import apiUtil from "../../commons/apiUtil";
import axios from 'axios';
import { SearchBody, KeywordResult } from '../../interfaces/interfaces';
import { Request, Response } from 'express';
import CryptoJS from "crypto-js";
import Logger from "../../commons/Logger";


/* URL 종류 */
const datalabURL = 'https://openapi.naver.com/v1/datalab/';
const searchADURL = 'https://api.naver.com/';

/* 요청하는 API 소스에 따라 달라지는 헤더 호출 함수 */
const createHeaders = (type: string) => {
  let headers = {};
  if (type === 'datalab') {
    headers = {
      "X-Naver-Client-Id": process.env.CLIENT_ID,
      "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
      "Content-Type": "application/json",
    };
  } else if (type === 'adSearch') {
    const api_url = "/keywordstool";
    const method = "GET";
    const timestamp = Date.now() + '';
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, process.env.NAVER_SERACHAD_SECRET);
    hmac.update(timestamp + '.' + method + '.' + api_url);
    let hash = hmac.finalize();
    hash.toString(CryptoJS.enc.Base64);
    headers = {
      'X-timestamp': timestamp,
      'X-API-KEY': process.env.NAVER_SEARCHAD_ACCESS,
      'X-API-SECRET': process.env.NAVER_SERACHAD_SECRET,
      'X-CUSTOMER': process.env.NAVER_SERACHAD_ID,
      'X-Signature': hash.toString(CryptoJS.enc.Base64),
    };
  }
  return headers;
};


/* URL이 오픈API인 경우*/
export const datalabSearch = async (data: SearchBody) => {
  let result;
  try {
    const headers = createHeaders('datalab');
    const response = await axios({
      baseURL: datalabURL,
      url: 'search',
      method: 'POST',
      headers: headers,
      data,
    });
    result = response.data;
  } catch (error) {
    Logger.error(error);
  }
  return result;
};

/* URL이 검색광고 API인 경우*/
export const adSearch = async (data: string) => {
  let result;
  try {
    const headers = createHeaders('adSearch');

    const response = await axios({
      baseURL: searchADURL,
      url: 'keywordstool',
      method: 'GET',
      headers: headers,
      params: {
        hintKeywords: data,
        showDetail: 1,
      }
    });
    result = response.data;
  } catch (error) {
    Logger.error(error);
  }
  return result;
};


/* 쇼핑인사이트 카테고리별 트렌드 조회  */

export const shoppingCategorySearch = async (data: SearchBody) => {
  let result;
  try {
    const headers = createHeaders('datalab');
    const response = await axios({
      baseURL: datalabURL,
      url: 'shopping/categories',
      method: 'POST',
      data: data,
      headers: headers
    });
    result = response.data;
  } catch (error) {
    Logger.error(error);
  }
  return result;
};

/* 쇼핑인사이트 카테고리내 기기별 트렌드 조회  */

export const shoppingTrendDeviceSearch = async (data: SearchBody) => {
  let result;
  try {


  } catch (error) {

  }
  return result;
};

/* 쇼핑인사이트 카테고리 내 성별 트렌드 조회 */

/* 쇼핑인사이트 키워드별 트렌드 조회 */

export const shoppingKeywordSearch = async (data: SearchBody) => {
  let result;
  try {
    const headers = createHeaders('datalab');
    const response = await axios({
      baseURL: datalabURL,
      url: 'shopping/category/keywords',
      method: 'POST',
      headers: headers,
      data
    });
    result = response.data;

  } catch (error) {
    Logger.error(error);
  }
  return result;
};



