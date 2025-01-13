import OpenAI from "openai";
import { Request, Response } from "express";

const client = new OpenAI({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_KEY,
});

export default async function handler(req: Request, res: Response) {
  const { prompt } = req.body;  
  const shape = ["", "", ""];

  const completion = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a machine that gives options for autocomple a sentence.'
      },
      { 
        role: "user", 
        content: `Please return what you think is the best autocomple for this string: ${prompt}. Please give 3 options. Return the response ${JSON.stringify(shape)}. Please deliver the response in plain text without any Markdown or formatting. Provide the output as raw text.` 
      }
    ],
    model: "gpt-4o-mini",
  });

  const data = JSON.parse(completion.choices[0].message.content || '[]');

  res.status(200).json({data});
}

