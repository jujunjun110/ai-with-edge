import { DifyService } from "../../services/difyService";

import { container } from "../../utils/container";
test("DifyService", async () => {
  const difyService = container.get<DifyService>(DifyService);
  const prompt = "東京の首都は？絶対に二文字で答えて";
  const res = await difyService.generateResponse(prompt);

  expect(res.isOk()).toBeTruthy();
  expect(res._unsafeUnwrap()).toBe("東京");
});
