import { Result, err, ok } from "neverthrow";
import { HttpClient } from "../utils/httpClient";
import { IllmService } from "./illmService";

export class DifyService implements IllmService {
  endpoint = "https://api.dify.ai/v1/workflows/run";

  constructor(private httpClient: HttpClient, private token: string) {}

  async generateResponse(prompt: string): Promise<Result<string, string>> {
    const data = {
      inputs: { prompt: prompt },
      response_mode: "blocking",
      conversation_id: "",
      user: "abc-123",
    };
    console.log(this.token);

    const headers = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    const res = await this.httpClient.post(this.endpoint, data, headers);
    if (res.isErr()) {
      return err(res.error);
    }

    if (!res.value?.data?.outputs?.output) {
      return err("dify returned empty or null");
    }

    return ok(res.value.data.outputs.output);
  }

  // async *generateResponseStream(prompt: string): AsyncIterableIterator<string> {
  //   yield* this.generateResponseStreamWithChatLog([new ChatLog("user", prompt)]);
  // }

  // async *generateResponseStreamWithChatLog(chatLog: ChatLog[]): AsyncIterableIterator<string> {
  //   const messages = chatLog.map((c) => c.toString());

  //   const query = messages.join("\n");
  //   const data = {
  //     inputs: { prompt: query },
  //     response_mode: "streaming",
  //     conversation_id: "",
  //     user: "abc-123",
  //   };

  //   const headers = {
  //     Authorization: `Bearer ${this.token}`,
  //     "Content-Type": "application/json",
  //   };

  //   console.log("query: ", query);
  //   console.log("headers: ", headers);

  //   const stream = await this.httpClient.postStream(this.endpoint, data, headers);

  //   for await (const chunk of stream) {
  //     const chunkHeader = "data:";
  //     const chunkStr = chunk.toString();
  //     const lines = chunkStr.split("\n").filter((l: string) => l.trim() !== "");

  //     for (const line of lines) {
  //       if (!line.startsWith(chunkHeader)) {
  //         continue;
  //       }

  //       try {
  //         const data = JSON.parse(line.replace(chunkHeader, ""));
  //         yield data?.data.text ?? "";
  //       } catch {
  //         yield "";
  //       }
  //     }
  //   }
  // }
}
