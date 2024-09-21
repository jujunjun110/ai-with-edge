import { Result } from "neverthrow";
import { DifyService } from "../services/difyService";
import { HttpClient } from "../utils/httpClient";

export class GetResponseUsecase {
  async execute(prompt: string): Promise<Result<string, string>> {
    const httpClient = new HttpClient();
    const token = process.env.DIFY_TOKEN || "";
    const difyService = new DifyService(httpClient, token);

    return difyService.generateResponse(prompt);
  }
}
