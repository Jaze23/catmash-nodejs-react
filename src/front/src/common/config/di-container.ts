import { Container } from "inversify";
import { HttpClient } from "./http-client";
import { CatService } from "../services/cat.service";

const DIContainer = new Container();
DIContainer.bind<HttpClient>(HttpClient)
  .toSelf()
  .inSingletonScope();
DIContainer.bind<CatService>(CatService)
  .toSelf()
  .inSingletonScope();


export default DIContainer;
