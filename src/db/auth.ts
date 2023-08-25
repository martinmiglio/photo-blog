import { client } from "@/db/client";
import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
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
  admin?: boolean;
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
    admin: item?.admin ?? false,
  } as User;
};

export const isUserPoster = cache(async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    return false;
  }
  return user.poster;
});

export const isUserAdmin = cache(async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    return false;
  }
  return user.admin;
});

export async function checkForAdminUser() {
  const command = new ScanCommand({
    TableName: `${env.AWS_RESOURCE_PREFIX}-users`,
    Limit: 1,
  });
  const items = (await client.send(command)).Items;

  const users = items?.map((item) => {
    return parseItem(item);
  });

  if (users?.length === 0) {
    return true;
  }
  return false;
}

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

export const getAllUsers = cache(async () => {
  const command = new ScanCommand({
    TableName: `${env.AWS_RESOURCE_PREFIX}-users`,
  });
  const items = (await client.send(command)).Items;

  if (!items) {
    return [];
  }

  const users = items?.map((item) => {
    return parseItem(item);
  });

  if (!users) {
    return [];
  }

  return users;
});

export async function createUser(user: User) {
  if (await checkForAdminUser()) {
    user.admin = true;
    user.poster = true;
  }
  const command = new PutCommand({
    TableName: `${env.AWS_RESOURCE_PREFIX}-users`,
    Item: user,
  });
  return await client.send(command);
}

export async function updateUser(user: User) {
  user.admin = await isUserAdmin(user.id); // Don't allow admin to be changed
  const command = new PutCommand({
    TableName: `${env.AWS_RESOURCE_PREFIX}-users`,
    Item: user,
  });
  return await client.send(command);
}
