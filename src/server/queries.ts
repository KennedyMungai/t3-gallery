import "server-only";
import { db } from "./db";

export const getImages = async () =>
  await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
