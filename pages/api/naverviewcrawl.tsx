import { Request, Response } from "express";
import { NaverViewCralwer } from "./crawlcontrollers";
import Logger from "../../commons/Logger";

export default async function handler(req: Request, res: Response) {
	try {
		if (req.method === 'POST') {
			const result = await NaverViewCralwer(req.body);

			res.status(200).send({ result });
		} else {
			res.status(403).json({ success: false });
		}
	} catch (error) {
		Logger.error(error);
		res.status(404).json({ success: false });
	}
}