import express, { Request, Response } from "express";
import Container from "typedi";
import { ErrorStatus } from "../../common/exceptions/error-status.model";
import CatService from "./cats.service";
import { RequestWithCat } from "./models/request-with-cat.interface";

const router = express.Router();

/**
 * @swagger
 * /cats:
 *    get:
 *      description: This should return a list of cats
 *      responses:
 *        200:
 *          description: Success
 */
router.get(
  "/",
  async (req: Request, res: Response, next: (err?: ErrorStatus) => void) => {
    try {
      const catService = Container.get(CatService);

      const cats = await catService.getCats();

      return res.json(cats);
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  "/versus",
  async (req: Request, res: Response, next: (err?: ErrorStatus) => void) => {
    try {
      const catService = Container.get(CatService);

      const cats = await catService.getVersus();

      return res.json(cats);
    } catch (e) {
      next(e);
    }
  },
);

router.param(
  "id",
  async (
    req: RequestWithCat,
    res: Response,
    next: (err?: ErrorStatus) => void,
  ) => {
    try {
      const catService = Container.get(CatService);

      const cat = await catService.getCatById(req.params.id);

      req.cat = cat;
      next();
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  "/:id/vote",
  async (
    req: RequestWithCat,
    res: Response,
    next: (err?: ErrorStatus) => void,
  ) => {
    try {
      const catService = Container.get(CatService);

      const updatedCat = await catService.vote(req.cat);

      return res.json(updatedCat);
    } catch (e) {
      next(e);
    }
  },
);

export default router;
