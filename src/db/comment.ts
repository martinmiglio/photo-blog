import { client } from "@/db/client";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { cache } from "react";
import "server-only";
import { z } from "zod";

const schema = z.object({
  AWS_RESOURCE_PREFIX: z.string(),
});
const env = schema.parse(process.env);

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
      TableName: `${env.AWS_RESOURCE_PREFIX}-comments`,
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
    TableName: `${env.AWS_RESOURCE_PREFIX}-comments`,
    Item: comment,
  });
  return await client.send(command);
};
