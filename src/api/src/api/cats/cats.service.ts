import { Service, Inject } from "typedi";
import { Model, Document } from "mongoose";
import { CatDto } from "./models/cat-dto.model";
import { Cat } from "./schemas/cat.interface";
import { mProjection } from "../../common/config";
import { ErrorStatus } from "../../common/exceptions/error-status.model";
import fs from "fs";
import path from "path";
import { promisify } from "util";

@Service()
export default class CatService {
  constructor(
    @Inject("catSchema")
    private catSchema: Model<Cat & Document>,
  ) {}

  public async populateCats() {
    try {
      const cats = await this.catSchema.find({});
      if (cats.length === 0) {
        const catsData = JSON.parse(
          (await promisify(fs.readFile)(
            path.join(__dirname, "../../../cats.json"),
          )).toString(),
        );
        await this.catSchema.create(catsData.images);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getCats(): Promise<CatDto[]> {
    try {
      const cats = await this.catSchema
        .find({}, mProjection(new CatDto()))
        .sort("-votes")
        .limit(100);
      if (cats.length === 0) {
        throw new ErrorStatus("No cats have been found", 404);
      }

      return cats;
    } catch (e) {
      throw e;
    }
  }

  public async getVersus(): Promise<CatDto[]> {
    try {
      const cats: CatDto[] = [];
      const count = await this.catSchema.estimatedDocumentCount();
      let rdm = Math.floor(Math.random() * count);

      const cat1 = await this.catSchema
        .findOne({}, mProjection(new CatDto()))
        .skip(rdm);

      rdm = Math.floor(Math.random() * count);

      const cat2 = await this.catSchema
        .findOne({}, mProjection(new CatDto()))
        .skip(rdm);

      cats.push(cat1!, cat2!);

      return cats;
    } catch (e) {
      throw e;
    }
  }

  public async vote(cat: Cat): Promise<CatDto> {
    try {
      const updatedCat = (await this.catSchema.findByIdAndUpdate(
        cat._id,
        { votes: cat.votes + 1 },
        { new: true, projection: mProjection(new CatDto()) },
      )) as CatDto;

      return updatedCat;
    } catch (e) {
      throw e;
    }
  }

  public async getCatById(id: string): Promise<Cat> {
    try {
      const cat = await this.catSchema.findById(id);
      if (!cat) {
        throw new ErrorStatus("Cat not found", 404);
      }

      return cat;
    } catch (e) {
      throw e;
    }
  }
}
