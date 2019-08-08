import { HttpClient } from "../config/http-client";
import { inject, injectable } from "inversify";
import { ICat } from "../../pages/home/interfaces/ICat.interface";

@injectable()
export class CatService {
  @inject(HttpClient)
  private httpClient!: HttpClient;
  private basePath: string = "/v1/cats";

  public async getCats(): Promise<ICat[]> {
    return await this.httpClient.get(`${this.basePath}`);
  }

  public async getVersus(): Promise<ICat[]> {
    return await this.httpClient.get(`${this.basePath}/versus`);
  }

  public async vote(_id: string): Promise<ICat> {
    return await this.httpClient.put(`${this.basePath}/${_id}/vote`, {});
  }
}
