export const config = {
  runtime: "edge",
};

export default async function handler(req:Request, context: any) {
  const { prompt } = await req.json();

  const completion = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        // stream: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      },
    }
  );

  return new Response(completion.body, {
    status: 200,
    headers: {
      "content-type": "application/json: charset=utf-8",
    },
  });
}
