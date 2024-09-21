import { Result } from "neverthrow";

export interface IllmService {
  generateResponse(prompt: string): Promise<Result<string, string>>;
  // generateResponseStream(prompt: string): AsyncIterableIterator<string>;
}
