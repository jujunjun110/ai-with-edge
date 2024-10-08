import { DifyService } from "../services/difyService";
import { HttpClient } from "../utils/httpClient";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "プロンプトが必要です" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const httpClient = new HttpClient();
    const token = process.env.DIFY_TOKEN || "";
    const difyService = new DifyService(httpClient, token);

    const stream = await difyService.generateResponseStream(prompt);

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            controller.enqueue(new TextEncoder().encode(chunk));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "内部サーバーエラー" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
