import { DifyService } from "../../services/difyService";
import { HttpClient } from "../../utils/httpClient";

test("DifyService", async () => {
  const httpClient = new HttpClient();
  const token = process.env.DIFY_TOKEN || "";
  const difyService = new DifyService(httpClient, token);
  const prompt = "日本の首都は？絶対に2文字で答えて";
  const res = await difyService.generateResponse(prompt);

  res.match(
    (value) => {
      expect(value).toBe("東京");
    },
    (error) => {
      console.error("Error occurred:", error);
      throw new Error(`Test failed with error: ${error}`);
    }
  );
});
