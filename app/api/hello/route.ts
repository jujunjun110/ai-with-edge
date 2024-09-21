import { NextResponse } from "next/server";
import { GetResponseUsecase } from "../usecases/getResponseUsecase";

export async function GET(): Promise<NextResponse> {
  const usecase = new GetResponseUsecase();
  const res = await usecase.execute("日本の首都は？絶対に2文字で答えて");

  return res.match(
    (data) => NextResponse.json(data), // 成功時のレスポンス
    (error) => NextResponse.json(error, { status: 500 }) // エラー時のレスポンス
  );
}
