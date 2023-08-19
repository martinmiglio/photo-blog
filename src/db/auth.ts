import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { cache } from "react";
import "server-only";
import { z } from "zod";

export type User = {
  id: string;
  email?: string;
  poster: boolean;
  name?: string;
  image?: string;
};

const schema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  USERS_DYNAMO_TABLE: z.string(),
  DYNAMO_REGION: z.string(),
});
const env = schema.parse(process.env);

const client = new DynamoDBClient({
  credentials: fromEnv(),
  region: env.DYNAMO_REGION,
});

export const parseItem = (item: any) => {
  return {
    id: item?.id ?? "0",
    email: item?.email ?? undefined,
    name: item?.name ?? undefined,
    image: item?.image ?? undefined,
    poster: item?.poster ?? false,
  } as User;
};

export const isUserPoster = cache(async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    return false;
  }
  return user.poster;
});

export const getUserById = cache(async (id: string) => {
  try {
    const command = new GetCommand({
      TableName: env.USERS_DYNAMO_TABLE,
      Key: {
        id: id,
      },
    });
    const res = await client.send(command);
    if (res.Item === undefined) {
      return null;
    }
    return parseItem(res.Item);
  } catch (err) {
    console.log(err);
    return null;
  }
});

export async function createUser(user: User) {
  const command = new PutCommand({
    TableName: env.USERS_DYNAMO_TABLE,
    Item: user,
  });
  return await client.send(command);
}
