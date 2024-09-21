// import { NextResponse } from "next/server";
// import { GetResponseUsecase } from "../usecases/getResponseUsecase";
import { DifyService } from "../services/difyService";
import { HttpClient } from "../utils/httpClient";
// import { NextApiRequest, NextApiResponse } from "next";

// bodyParserを無効にする設定を追加
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export interface AIResponse {
  message: string;
}

// export async function GET(request: Request): Promise<NextResponse> {
//   const { searchParams } = new URL(request.url);
//   const prompt = searchParams.get("prompt") || "";

//   const httpClient = new HttpClient();
//   const token = process.env.DIFY_TOKEN || "";
//   const difyService = new DifyService(httpClient, token);
//   const usecase = new GetResponseUsecase(difyService);
//   const res = await usecase.execute(prompt);

//   if (res.isErr()) {
//     return NextResponse.json(res.error, { status: 500 });
//   }

//   const successResult: AIResponse = { message: res.value };
//   return NextResponse.json(successResult);
// }
// app/api/ai/route.ts

export const runtime = "nodejs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  try {
    // const { prompt } = await request.json();
    const prompt = "日本の首都について教えて下さい";

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
