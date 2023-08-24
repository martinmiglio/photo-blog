import { client } from "@/db/client";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { cache } from "react";
import "server-only";
import { z } from "zod";

const schema = z.object({
  AWS_RESOURCE_PREFIX: z.string(),
});
const env = schema.parse(process.env);

export type User = {
  id: string;
  email?: string;
  poster: boolean;
  name?: string;
  image?: string;
};

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
      TableName: `${env.AWS_RESOURCE_PREFIX}-users`,
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
    console.error(err);
    return null;
  }
});

export async function createUser(user: User) {
  const command = new PutCommand({
    TableName: `${env.AWS_RESOURCE_PREFIX}-users`,
    Item: user,
  });
  return await client.send(command);
}
