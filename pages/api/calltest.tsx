import Logger from "../../commons/Logger";

export default async function handler(req, res) {
  Logger.info("hellow world");

  if (req.method === 'POST') {
    res.status(200).json({ success: false });
  } else {
    res.status(403).json({ success: false });
  }
}
