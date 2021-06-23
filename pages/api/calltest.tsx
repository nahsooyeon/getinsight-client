import dayjs from 'dayjs';

import Logger from "../../commons/Logger";


export default async function handler(req, res) {
  let resData;
  if (req.method === 'POST') {
    resData = { success: true, timestamp: dayjs().unix(), timeFormat: dayjs().format("YYYY-MM-DD HH:mm:ss Z") };
    res.status(200).json(resData);
  } else {
    resData = { success: false, timestamp: dayjs().unix(), timeFormat: dayjs().format("YYYY-MM-DD HH:mm:ss Z") };
    res.status(403).json(resData);
  }
}
