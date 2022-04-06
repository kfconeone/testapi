// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

var admin = require("firebase-admin");

const serviceAccount = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};

type Data = {
  name: string;
};

var db: any = null;
function getDb() {
  if (db != null) return db;
  console.log("Initializing app");

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
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.body.line_items);
    if (req.body.line_items.length > 0) {
      let tempLineItems = req.body.line_items.map((item: any) => {
        return {
          quantity: item.quantity,
          price: item.price,
          sku: item.sku,
          title: item.title,
        };
      });

      db = getDb();
      db.collection("shopify_hooks").doc(req.body.id).set({
        line_items: tempLineItems,
        updated_at: req.body.updated_at,
        created_at: req.body.created_at,
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }

  res.status(200).json({ name: "Hello World" });
}
