import { Post } from "@/types/Post/Post";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import { GetCommand, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { z } from "zod";

const schema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  DYNAMO_TABLE: z.string(),
  DYNAMO_REGION: z.string(),
});
const env = schema.parse(process.env);

const credentials = fromEnv();
const client = new DynamoDBClient({
  credentials,
  region: env.DYNAMO_REGION,
});

export async function getPostBySlug(slug: string) {
  const command = new GetCommand({
    TableName: env.DYNAMO_TABLE,
    Key: {
      slug: slug,
    },
  });
  const response = await client.send(command);
  const post: Post = {
    title: response.Item?.title ?? "Post not found",
    body: response.Item?.body ?? "",
    imageURL: response.Item?.imageURL ?? "https://placehold.co/600x400",
    slug: response.Item?.slug ?? "",
    timestamp: response.Item?.timestamp ?? "0",
    author: response.Item?.author ?? "Unknown",
  };
  return post;
}

export async function getAllPosts() {
  const command = new ScanCommand({
    TableName: env.DYNAMO_TABLE,
  });
  const response = await client.send(command);

  return response.Items as Post[];
}

export async function createPost(post: Post) {
  const command = new PutCommand({
    TableName: env.DYNAMO_TABLE,
    Item: post,
  });
  return await client.send(command);
}
