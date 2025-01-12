import OpenAI from "openai";
import { Request, Response } from "express";

const client = new OpenAI({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_KEY,
});

export default async function handler(req: Request, res: Response) {
  console.log(req.body);
  const { content } = req.body;
  const response = await client.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-4o-mini",
  });

  res.status(200).json(response);
}
