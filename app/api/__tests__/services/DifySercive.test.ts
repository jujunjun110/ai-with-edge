import assert from "assert";
import { DifyService } from "../../services/difyService";

import { container } from "../../utils/container";
test("DifyService", () => {
  const difyService = container.get<DifyService>(DifyService);
  // assert(difyService.getToken() == "abc");
  assert(difyService.getClient() != null);
});
