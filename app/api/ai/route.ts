import { NextResponse } from "next/server";
import { GetResponseUsecase } from "../usecases/getResponseUsecase";
import { DifyService } from "../services/difyService";
import { HttpClient } from "../utils/httpClient";

export interface AIResponse {
  message: string;
}

export async function GET(): Promise<NextResponse> {
  const httpClient = new HttpClient();
  const token = process.env.DIFY_TOKEN || "";
  const difyService = new DifyService(httpClient, token);
  const usecase = new GetResponseUsecase(difyService);
  const res = await usecase.execute("日本の首都は？絶対に2文字で答えて");

  if (res.isErr()) {
    return NextResponse.json(res.error, { status: 500 });
  }

  const suc: AIResponse = { message: res.value };
  return NextResponse.json(suc);
}
