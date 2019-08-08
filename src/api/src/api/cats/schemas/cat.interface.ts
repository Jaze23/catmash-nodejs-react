import { TimedSchema } from "../../../common/interfaces/schemas/timed-schema.interface";

export interface Cat extends TimedSchema {
  _id: string;
  id: string;
  url: string;
  votes: number;
}
