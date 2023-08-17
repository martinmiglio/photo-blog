import { Post } from "@/types/Post/Post";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import { GetCommand, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { cache } from "react";
import "server-only";
import { z } from "zod";

export const revalidate = 120;

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

export const getPostBySlug = cache(async (slug: string) => {
  const command = new GetCommand({
    TableName: env.DYNAMO_TABLE,
    Key: {
      slug: slug,
    },
  });
  const response = await client.send(command);
  return {
    title: response.Item?.title ?? "Post not found",
    body: response.Item?.body ?? "",
    imageURL: response.Item?.imageURL ?? "https://via.placeholder.com/500x500",
    slug: response.Item?.slug ?? "",
    timestamp: response.Item?.timestamp ?? "0",
    author: response.Item?.author ?? "Unknown",
  } as Post;
});

export const getAllPosts = cache(async () => {
  const command = new ScanCommand({
    TableName: env.DYNAMO_TABLE,
  });
  return (await client.send(command)).Items as Post[];
});

export async function createPost(post: Post) {
  const command = new PutCommand({
    TableName: env.DYNAMO_TABLE,
    Item: post,
  });
  return await client.send(command);
}
