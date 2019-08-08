import { HookNextFunction } from "mongoose";
import { TimedSchema } from "../interfaces/schemas/timed-schema.interface";

export const timedSchemaPre = function (next: HookNextFunction) {
  const doc = this as TimedSchema;
  const now = new Date();
  doc.updatedAt = now;
  if (!doc.createdAt) {
    doc.createdAt = now;
  }
  next();
};

export const mProjection = <T>(obj: T) => {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([k, v]) => ({ [k]: true })),
  );
};
