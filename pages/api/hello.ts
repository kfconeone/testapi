// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log("this is the request body");
    console.log(req.body);
    // console.log(process.env);
  } catch (error) {
    console.log("error: ", error);
  }

  res.status(200).json({ name: "Hello World" });
}
