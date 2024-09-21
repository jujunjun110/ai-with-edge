/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { IncomingMessage } from "http";
import { Result, err, ok } from "neverthrow";

// @injectable()
export class HttpClient {
  async post(url: string, data: any, headers?: any): Promise<Result<any, string>> {
    const config = { headers: headers } as AxiosRequestConfig;

    try {
      const response = await this._postRaw(url, data, config);
      return ok(response);
    } catch (_error) {
      const error = _error as Error;
      return err(`${error.message}: ${error.stack}`);
    }
  }

  async postStream(url: string, data: any, headers?: any): Promise<IncomingMessage> {
    const config = {
      headers: headers,
      responseType: "stream",
    } as AxiosRequestConfig;
    const response = await this._postRaw(url, data, config);
    return response;
  }

  private async _postRaw(url: string, data: any, config?: AxiosRequestConfig): Promise<any> {
    const response = await axios.post(url, data, config);
    return response.data;
  }
}
