import { Result } from "neverthrow";
import { IllmService } from "../services/illmService";

export class GetResponseUsecase {
  constructor(private llmService: IllmService) {}

  async execute(prompt: string): Promise<Result<string, string>> {
    return this.llmService.generateResponse(prompt);
  }
}
