import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import * as url from 'url';

// 短い感覚にリクエストが発生したらその分だけNode.jsを立ち上げて下記の関数を走らせる為
// 今回使っているMongoDBが詰まる可能性があるのでキャッシュから再利用するように下記の変数を使う。
let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    // これを設定しないとターミナルにWarningエラーが出ます。
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}
export default async(request: NowRequest, response: NowResponse) => {
  const { email } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('subscribers');

  await collection.insertOne({
    email,
    subscribedAt: new Date(),
  });

  return( 
    response.status(201).json({ ok: true })
  );
}