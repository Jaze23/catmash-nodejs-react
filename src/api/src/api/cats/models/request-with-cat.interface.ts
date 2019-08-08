import { Request } from "express";
import { Cat } from "../schemas/cat.interface";
export interface RequestWithCat extends Request {
  cat: Cat;
}
