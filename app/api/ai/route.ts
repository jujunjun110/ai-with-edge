import { NextResponse } from "next/server";
import { GetResponseUsecase } from "../usecases/getResponseUsecase";
import { DifyService } from "../services/difyService";
import { HttpClient } from "../utils/httpClient";

export interface AIResponse {
  message: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt") || "";

  const httpClient = new HttpClient();
  const token = process.env.DIFY_TOKEN || "";
  const difyService = new DifyService(httpClient, token);
  const usecase = new GetResponseUsecase(difyService);
  const res = await usecase.execute(prompt);

  if (res.isErr()) {
    return NextResponse.json(res.error, { status: 500 });
  }

  const successResult: AIResponse = { message: res.value };
  return NextResponse.json(successResult);
}
