// app/api/hello/route.ts

import { NextResponse } from "next/server";
import { Result, ok, err } from "neverthrow";

type Data = { message: string };
type Error = { message: string };

// サンプルの関数: 成功とエラーをランダムで返す
async function getData(): Promise<Result<Data, Error>> {
  const isSuccess = Math.random() > 0.5; // ランダムに成功/失敗を決定
  if (isSuccess) {
    return ok({ message: "Hello, World!" });
  } else {
    return err({ message: "Something went wrong" });
  }
}

export async function GET(): Promise<NextResponse> {
  const result = await getData();

  return result.match(
    (data) => NextResponse.json(data), // 成功時のレスポンス
    (error) => NextResponse.json(error, { status: 500 }) // エラー時のレスポンス
  );
}
