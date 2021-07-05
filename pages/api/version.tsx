import { Response, Request } from 'express';

export default async function handler(req: Request, res: Response) {
  try {
    res.status(200).json({ version: 1.1 });
    return;

  } catch (error) {

  }
}


