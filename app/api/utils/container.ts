import { Container } from "inversify";
import { DifyService } from "../services/difyService";
import { HttpClient } from "./httpClient";

const container = new Container();

container.bind<string>("DIFY_TOKEN").toConstantValue(process.env.Dify_TOKEN || "");

container.bind<DifyService>(DifyService).toSelf();
container.bind<HttpClient>(HttpClient).toSelf();

export { container };
