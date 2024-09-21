import { DifyService } from "../../services/difyService";
import { HttpClient } from "../../utils/httpClient";

test("generateResponse", async () => {
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

test("generateResponseStream", async () => {
  const httpClient = new HttpClient();
  const token = process.env.DIFY_TOKEN || "";
  const difyService = new DifyService(httpClient, token);
  const prompt = "日本の首都について30文字程度で教えて下さい";
  const stream = difyService.generateResponseStream(prompt);

  let count = 0;
  let messaage = "";
  for await (const chunk of stream) {
    count++;
    messaage += chunk;
    if (count % 10 === 0) {
      console.log(messaage);
    }
  }
  expect(count).toBeGreaterThan(0);
});
