import { Post } from "@/types/Post/Post";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import { GetCommand, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { cache } from "react";
import "server-only";
import { z } from "zod";

const schema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  DYNAMO_TABLE: z.string(),
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
    body: item?.body ?? "",
    imageURL: item?.imageURL ?? "https://via.placeholder.com/500x500",
    slug: item?.slug ?? "",
    timestamp: item?.timestamp ?? "0",
    author: item?.author ?? "Unknown",
    tags: item?.tags ?? [],
  } as Post;
};

export const getPostBySlug = cache(async (slug: string) => {
  const command = new GetCommand({
    TableName: env.DYNAMO_TABLE,
    Key: {
      slug: slug,
    },
  });
  const item = (await client.send(command)).Item;
  return parseItem(item);
});

export const getAllPosts = cache(async () => {
  const command = new ScanCommand({
    TableName: env.DYNAMO_TABLE,
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
    return (
      new Date(b.timestamp).getUTCMilliseconds() -
      new Date(a.timestamp).getUTCMilliseconds()
    );
  });

  return posts;
});

export async function createPost(post: Post) {
  const command = new PutCommand({
    TableName: env.DYNAMO_TABLE,
    Item: post,
  });
  return await client.send(command);
}
