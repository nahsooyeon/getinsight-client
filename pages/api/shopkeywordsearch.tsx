import { Request, Response } from "express";
import { shoppingKeywordSearch } from "./naverapi";
import Logger from "../../commons/Logger";



export default async function handler(req: Request, res: Response) {
  try {
    if (req.method === 'POST') {
      const result = await shoppingKeywordSearch(req.body.keyword);
      res.status(200).send({ result });
    } else {
      res.status(403).json({ success: false });
    }
  } catch (error) {
    Logger.error(error);
    res.status(404).json({ success: false });
  }
}


