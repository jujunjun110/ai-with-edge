import { NextResponse } from "next/server";
import { GetResponseUsecase } from "../usecases/getResponseUsecase";
import { DifyService } from "../services/difyService";
import { HttpClient } from "../utils/httpClient";

export async function GET(): Promise<NextResponse> {
  const httpClient = new HttpClient();
  const token = process.env.DIFY_TOKEN || "";
  const difyService = new DifyService(httpClient, token);
  const usecase = new GetResponseUsecase(difyService);
  const res = await usecase.execute("日本の首都は？絶対に2文字で答えて");

  return res.match(
    (data) => NextResponse.json(data), // 成功時のレスポンス
    (error) => NextResponse.json(error, { status: 500 }) // エラー時のレスポンス
  );
}
