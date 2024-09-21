import { DifyService } from "../../services/difyService";

import { container } from "../../utils/container";
test("DifyService", () => {
  const difyService = container.get<DifyService>(DifyService);
  expect(difyService.getToken()).toBe("abc");
  expect(difyService.getClient()).not.toBeNull();
});
