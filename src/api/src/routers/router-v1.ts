import express from "express";
import catsController from "../api/cats/cats.controller";
import swaggerUi from "swagger-ui-express";

// Swagger docs
import specs from "../common/config/swagger-config";

const router = express.Router();
router.use("/cats", catsController);
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

export default router;
