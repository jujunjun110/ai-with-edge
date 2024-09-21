import { Container } from "inversify";
import { DifyService } from "../services/difyService";
import { HttpClient } from "./httpClient";

const container = new Container();

console.log(process.env);
console.log(process.env.DIFY_TOKEN);
container.bind<string>("DIFY_TOKEN").toConstantValue(process.env.DIFY_TOKEN || "abc");
container.bind<DifyService>(DifyService).toSelf();
container.bind<HttpClient>(HttpClient).toSelf();

export { container };
