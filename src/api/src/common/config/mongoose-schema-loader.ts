import { Container } from "typedi";
import catSchema from "../../api/cats/schemas/cat.schema";

export default function mongooseSchemaLoader() {
  Container.set("catSchema", catSchema);
}
