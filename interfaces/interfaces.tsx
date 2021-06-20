export interface KeywordBody {
  startDate?: string;
  endDate?: string;
  timeUnit?: string;
  category?: string;
  keywordGroups?: keywordGroups[];
  keyword?: categoryInfo[];
  device?: string;
  gender?: string;
  ages?: any[];
}
export interface keywordGroups {
  groupName: string;
  keywords: string[];
}

export interface categoryInfo {
  name: string;
  param: string[];
}