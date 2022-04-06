// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

var admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.SAKEY as string);

type Data = {
  name: string;
};

var db: any = null;
function getDb() {
  if (db != null) return db;
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  return admin.firestore();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let db = getDb();

    console.log("this is the request body");

    let doc = await db.collection("Users").doc("User001").get();
    console.log(doc.id);
    console.log(doc.data());
  } catch (error) {
    console.log("error: ", error);
  }

  res.status(200).json({ name: "Hello World" });
}
