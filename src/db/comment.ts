import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { cache } from "react";
import "server-only";
import { z } from "zod";

const schema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  COMMENTS_DYNAMO_TABLE: z.string(),
  DYNAMO_REGION: z.string(),
});
const env = schema.parse(process.env);

const client = new DynamoDBClient({
  credentials: fromEnv(),
  region: env.DYNAMO_REGION,
});

export type Comment = {
  postSlug: string;
  authorId: string;
  timestamp: string;
  body: string;
};

const parseItem = (item: any) => {
  return {
    id: item?.id ?? "0",
    postSlug: item?.postSlug ?? "",
    authorId: item?.authorId ?? "",
    timestamp: item?.timestamp ?? "0",
    body: item?.body ?? "",
  } as Comment;
};

export const getCommentsByPostSlug = cache(async (postSlug: string) => {
  try {
    const command = new QueryCommand({
      TableName: env.COMMENTS_DYNAMO_TABLE,
      KeyConditionExpression: "#ps = :ps",
      ExpressionAttributeValues: {
        ":ps": postSlug,
      },
      ExpressionAttributeNames: {
        "#ps": "postSlug",
      },
    });
    const items = (await client.send(command)).Items;
    if (!items) {
      return [];
    }
    return items.map((item) => parseItem(item));
  } catch (err) {
    console.error(err);
    return null;
  }
});

export const createComment = async (comment: Comment) => {
  const command = new PutCommand({
    TableName: env.COMMENTS_DYNAMO_TABLE,
    Item: comment,
  });
  return await client.send(command);
};
