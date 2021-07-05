export interface SearchBody {
  startDate?: string;
  endDate?: string;
  timeUnit?: string;
  category?: string | categoryInfo[];
  keywordGroups?: keywordGroups[];
  keyword?: categoryInfo[];
  device?: string;
  gender?: string;
  ages?: any[];
}
export interface keywordGroups {
  groupName?: string;
  keywords?: string[];
}

export interface categoryInfo {
  name: string;
  param: string[];
}


export interface KeywordResult {
  startDate?: string,
  endDate?: string,
  timeUnit?: string,
  results?: GroupResult[];

}

export interface GroupResult {
  title?: string,
  keywords?: string[],
  data?: searchElement[];
}
export interface searchElement {
  period: string,
  ratio: number;
}


export interface KeywordListElement {
  relKeyword?: string,
  monthlyPcQcCnt?: number,
  monthlyMobileQcCnt?: number;
  monthlyAvePcClkCnt?: number,
  monthlyAveMobileClkCnt?: number,
  monthlyAvePcCtr?: number,
  monthlyAveMobileCtr?: number,
  plAvgDepth?: number,
  compIdx?: string;

}

export interface ShoppingTrend {
  startdate?: string,
  endDate?: string,
  timeUnit?: string,
  results?: ShoppingGroupResult[];
}

export interface ShoppingGroupResult {
  title?: string,
  category?: string[],
  data?: searchElement[];
}

export interface ProductCrawlData {
  title: string;
  price: string;
  review: string;
  like: string;
}
