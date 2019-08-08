import "reflect-metadata";
import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import { injectable } from "inversify";

@injectable()
export class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.api.url,
    });
  }

  public async get<T>(path: string): Promise<T> {
    return (await this.instance.get<T>(path)).data;
  }

  public async post<T>(path: string, body: any): Promise<T> {
    return (await this.instance.post<T>(path, body)).data;
  }

  public async put<T>(path: string, body: any): Promise<T> {
    return (await this.instance.put<T>(path, body)).data;
  }

  public async delete<T>(path: string): Promise<T> {
    return (await this.instance.delete<T>(path)).data;
  }
}
