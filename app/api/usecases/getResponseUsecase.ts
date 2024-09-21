import { Result } from "postcss";
import { DifyService } from "../services/difyService";
import { container } from "../utils/container";

export class GetResponseUsecase {
  async execute(prompt: string): Promise<Result<string, string>> {
    const difyService = container.get<DifyService>(DifyService);
    return difyService.generateResponse(prompt);
  }
}
