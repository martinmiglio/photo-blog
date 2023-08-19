import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import { GetCommand, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { cache } from "react";
import "server-only";
import { z } from "zod";

export type Post = {
  title: string;
  imageURL: string;
  slug: string;
  authorId: string;
  timestamp: string;
  body?: string;
  tags?: string[];
};

const schema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  POSTS_DYNAMO_TABLE: z.string(),
  DYNAMO_REGION: z.string(),
});
const env = schema.parse(process.env);

const client = new DynamoDBClient({
  credentials: fromEnv(),
  region: env.DYNAMO_REGION,
});

const parseItem = (item: any) => {
  return {
    title: item?.title ?? "Post not found",
    body: item?.body ?? undefined,
    imageURL: item?.imageURL ?? "https://via.placeholder.com/500x500",
    slug: item?.slug ?? "",
    timestamp: item?.timestamp ?? "0",
    authorId: item?.authorId ?? "",
    tags: item?.tags ?? [],
  } as Post;
};

export const getPostBySlug = cache(async (slug: string) => {
  try {
    const command = new GetCommand({
      TableName: env.POSTS_DYNAMO_TABLE,
      Key: {
        slug: slug,
      },
    });
    const item = (await client.send(command)).Item;
    return parseItem(item);
  } catch (err) {
    console.log(err);
    return null;
  }
});

export const getAllPosts = cache(async () => {
  const command = new ScanCommand({
    TableName: env.POSTS_DYNAMO_TABLE,
  });
  const items = (await client.send(command)).Items;

  const posts = items?.map((item) => {
    return parseItem(item);
  });

  if (!posts) {
    return [];
  }

  posts.sort((a, b) => {
    if (!a.timestamp || !b.timestamp) {
      return 0;
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return posts;
});

export async function createPost(post: Post) {
  const command = new PutCommand({
    TableName: env.POSTS_DYNAMO_TABLE,
    Item: post,
  });
  return await client.send(command);
}
